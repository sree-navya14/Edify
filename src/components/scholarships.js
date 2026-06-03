import React from "react";

const scholarships = [
  {
    title: "Banishree Scholarship",
    provider: "Government of Odisha",
    amount: "₹10,000 per year",
    deadline: "31st March 2025",
  },
  {
    title: "Medhabruti Scholarship",
    provider: "Higher Education Department, Odisha",
    amount: "₹20,000 per year",
    deadline: "15th April 2025",
  },
  {
    title: "PRERANA Scholarship",
    provider: "SC & ST Development Department, Odisha",
    amount: "Variable Amount",
    deadline: "30th June 2025",
  },
  {
    title: "Junior Merit Scholarship",
    provider: "Government of Odisha",
    amount: "₹12,000 per year",
    deadline: "10th May 2025",
  },
  {
    title: "Senior Merit Scholarship",
    provider: "Higher Education Department, Odisha",
    amount: "₹25,000 per year",
    deadline: "20th July 2025",
  },
  {
    title: "E-Medhabruti Scholarship",
    provider: "Government of Odisha",
    amount: "₹30,000 per year",
    deadline: "5th August 2025",
  },
  {
    title: "Post-Matric Scholarship",
    provider: "SC & ST Development Department, Odisha",
    amount: "Based on Course",
    deadline: "28th February 2025",
  },
  {
    title: "Pre-Matric Scholarship",
    provider: "Minority & Backward Classes Welfare Department",
    amount: "₹5,000 per year",
    deadline: "15th March 2025",
  },
];

const styles = {
  card: {
    backgroundColor: "#1e1e1e",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    padding: "20px",
    margin: "15px",
    width: "320px",
    transition: "transform 0.3s ease-in-out",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#fff",
  },
  provider: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  amount: {
    fontSize: "14px",
    // fontWeight: "bold",
    color: "#fff",
    marginBottom: "10px",
  },
  deadline: {
    fontSize: "14px",
    color: "#e74c3c",
  },
  button: {
    marginTop: "15px",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

const ScholarshipCard = ({ title, provider, amount, deadline }) => {
  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.provider}>{provider}</p>
      <p style={styles.amount}>{amount}</p>
      <p style={styles.deadline}>Deadline: {deadline}</p>
      <button
        style={styles.button}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Apply Now
      </button>
    </div>
  );
};

const ScholarshipList = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "20px" }}>
      {scholarships.map((scholarship, index) => (
        <ScholarshipCard key={index} {...scholarship} />
      ))}
    </div>
  );
};

export default ScholarshipList;
