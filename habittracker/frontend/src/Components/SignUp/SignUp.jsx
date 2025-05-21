import React from 'react';
import { Link } from "react-router-dom";
import './SignUp.scss';

const SignUp = () =>{
     return (
    <div className="wrapper-signUp">
      <div className="illustration">
        {/* <img src="https://source.unsplash.com/random" alt="illustration" /> */}
      </div>
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" required/>
          </div>
          <div>
            <label htmlFor="name">E-Mail</label>
            <input type="text" id="name" placeholder="Enter your mail" required/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter you password"
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