const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  enrolledCourses: { type: [String], default: [] },
  completedCourses: { type: [String], default: [] },
  about: { type: String, default: "" },
  personalDetails: { type: String, default: "" },
  dayProgress: { type: Object, default: {} },
  mentorAssigned: {
  type: Boolean,
  default: false,
},

});

const User = mongoose.model('User', userSchema);

// Auth token verification middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Course details mapping
const courseDetails = {
  java_course: { 
    title: "Java Developer", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlytRRYe4je0g5y3CR8NS1xkrAvurMcvSAxQ&s" 
  },
  python_course: { 
    title: "Python Developer", 
    image: "/python.png" // or another URL
  },
};


// Routes

// Register new user
app.post('/api/auth/register', async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, phone, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/boost-career', verifyToken, async (req, res) => {
  const { name, email, mobile, interest } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.personalDetails = `Name: ${name}, Mobile: ${mobile}, Interest: ${interest}`;
    user.mentorAssigned = true;
    await user.save();

    res.status(200).json({ message: "Mentor will be assigned soon!" });
  } catch (err) {
    console.error('Boost career error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


// Login user
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout user
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Get current user profile
app.get('/api/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// Update user profile
app.put('/api/me/update', verifyToken, async (req, res) => {
  const { about, personalDetails } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { about, personalDetails },
      { new: true, runValidators: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Update day progress
app.put('/api/progress', verifyToken, async (req, res) => {
  const { dayProgress } = req.body;
  try {
    if (typeof dayProgress !== 'object') {
      return res.status(400).json({ message: 'Invalid progress data' });
    }
    const user = await User.findByIdAndUpdate(req.user.id, { dayProgress }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Progress updated' });
  } catch (err) {
    console.error('Update progress error:', err);
    res.status(500).json({ message: 'Failed to update progress' });
  }
});

// Mark course as completed
app.put('/api/mark-completed', verifyToken, async (req, res) => {
  const { courseId } = req.body;
  try {
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID required' });
    }
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.enrolledCourses = user.enrolledCourses.filter(id => id !== courseId);
    if (!user.completedCourses.includes(courseId)) {
      user.completedCourses.push(courseId);
    }
    await user.save();
    res.json({ message: 'Course marked completed' });
  } catch (err) {
    console.error('Mark completed error:', err);
    res.status(500).json({ message: 'Failed to mark as completed' });
  }
});

// Enroll in course
app.post('/api/enroll', verifyToken, async (req, res) => {
  const { courseId } = req.body;
  try {
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID required' });
    }
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ message: 'Enrollment failed' });
  }
});

// Get enrolled and completed courses for user
app.get('/api/enrolled-courses', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const enrolled = user.enrolledCourses.map(id => ({
      id,
      title: courseDetails[id]?.title || "Unknown Course",
      image: courseDetails[id]?.image || "/default-course.png",
    })).filter(Boolean);

    const completed = user.completedCourses.map(id => ({
      id,
      title: courseDetails[id]?.title || "Unknown Course",
      image: courseDetails[id]?.image,
    
      userName: user.firstName
    })).filter(Boolean);

    res.json({ enrolled, completed });
  } catch (err) {
    console.error('Fetch courses error:', err);
    res.status(500).json({ message: 'Fetch courses failed' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

