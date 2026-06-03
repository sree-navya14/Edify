import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";

export default function BuyCourse() {
  const location = useLocation();
  const navigate = useNavigate();

  const { course } = location.state || {};

  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        if (!course) return;

        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (
          data.purchasedCourses &&
          data.purchasedCourses.includes(course.title)
        ) {
          setIsPurchased(true);
        }
      } catch (error) {
        console.error("Error loading purchases:", error);
      }
    };

    fetchPurchasedCourses();
  }, [course]);

  if (!course) {
    return <h2>Course not found</h2>;
  }

  const handlePayment = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/create-order",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: course.courseId,
            amount: course.price,
            courseName: course.title
          }),
        }
      );

      const data = await response.json();

      console.log("Order created:", data);

      const cashfree = await load({
        mode: "sandbox",
      });

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <img
        src={course.image}
        alt={course.title}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      <h1>{course.title}</h1>

      <h2>₹{course.price}</h2>

      <p>Unlock full access to this premium course.</p>

      {isPurchased ? (
        <button
          onClick={() => navigate(course.path)}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Start Course
        </button>
      ) : (
        <button
          onClick={handlePayment}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Buy Now
        </button>
      )}
    </div>
  );
}