import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';

export default function Login() {
	const[password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

		const preventRefresh = (e) => {
		e.preventDefault();
	};

	const handleLogin = async(e) => {
		e.preventDefault();
		try{
				const response = await fetch('http://localhost:8080/auth/login',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					password,
					email,
				}),
				credentials: 'include', 
			});

			if(response.ok){
				const data = await response.json();
				const token = data.token;
				const username = data.username;

				localStorage.setItem('token', token);
				localStorage.setItem('username', username);

				alert(`Login was successful! Welcome, ${username}`);

				navigate("/form");
			}else{
				throw new Error("Failed to log user in", response.status);
			}
		}catch(error){
			console.error("Error", error);
		}
	};

	return (
		<div className="wrapper-signIn">
			<div className="illustration">
				{/* <img src="https://source.unsplash.com/random" alt="illustration" /> */}
			</div>
			<div className="form">
				<div className="heading">LOGIN</div>
				<form onSubmit={handleLogin}>
					<div>
						<label htmlFor="password">Password</label>
						<input 
						type="text" 
						id="password" 
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="e-mail">E-Mail</label>
						<input 
						type="email" 
						id="e-mail" 
						placeholder="Enter you mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						 />
					</div>
					<button className='submiter' type="submit">
						Submit
					</button>
				</form>
				<p>
					Don't have an account ? <Link to="/signup"> Sign In </Link>
				</p>
			</div>
		</div>
	);
}