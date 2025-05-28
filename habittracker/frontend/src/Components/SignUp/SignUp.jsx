import React from 'react';
import { Link, useNavigate  } from "react-router-dom";
import './SignUp.scss';
import { useState } from 'react';

const SignUp = () =>{
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSignup = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            credentials: 'include', 
        });

        if (!response.ok) {
            const errorData = await response.text();
            alert("Signup failed: " + errorData);
            return;
        }

        const user = await response.json();
        alert("Signup successful");
        navigate("/verify");
    } catch (error) {
        console.error("Error during signup", error);
        alert("Something went wrong in signup: " + error.message);
    }
};


     return (
    <div className="wrapper-signUp">
      <div className="illustration">
        {/* <img src="https://source.unsplash.com/random" alt="illustration" /> */}
      </div>
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" 
            id="name" 
            placeholder="Enter your name"  
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required/>
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input type="text" 
            id="email" 
            placeholder="Enter your mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter you password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='bttn' type="submit">Submit</button>
        </form>
        <p>
          Have an account ? <Link to="/login"> Login </Link>
        </p>
      </div>
    </div>
  );
}
export default SignUp;