// VerifyCode.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Verify.scss';

const Verify = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setverificationCode] = useState("");
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      if (response.ok) {
        alert("Email verified! You can now log in.");
        navigate("/login");
      } else {
        const errorText = await response.text();
        alert("Verification failed: " + errorText);
      }
    } catch (error) {
      console.error("Verification error", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="wrapper-verification">
      <h2 className="verify-title">Verify Your Email</h2>
      <div className='content'>
      <form onSubmit={handleVerification}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setverificationCode(e.target.value)}
          required
        />
        <button  className="submitter" type="submit">Verify</button>
      </form>
      </div>
    </div>
  );
};

export default Verify;
