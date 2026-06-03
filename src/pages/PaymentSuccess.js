import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {

  const [searchParams] = useSearchParams();

  useEffect(() => {

    const savePurchase = async () => {

      const courseName =
        searchParams.get("courseName");

      try {

        await fetch(
          "http://localhost:5000/api/payment-success",
          {
            method: "POST",
            credentials: "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              courseName,
            }),
          }
        );

      } catch (err) {
        console.error(err);
      }
    };

    savePurchase();

  }, [searchParams]);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>🎉 Payment Successful</h1>

      <p>
        Course unlocked successfully.
      </p>
    </div>
  );
}