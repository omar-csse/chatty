import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Home.scss';


const Home = (props) => {

	useEffect(() => {
        document.body.classList.add('App-home');
        document.getElementById("navbarSupportedContent").classList.remove("show");
		return (() => document.body.classList.remove('App-home'));
	}, []);

	return (
		<div className="home mt-5">
			<div className="left mt-4">
				<h1><b>Chatty makes it <br/>easier</b></h1>
				<p className="pt-3">Modern, easy, secure way to chat.</p>
				<form>
					<Link to="/login" className="login-btn btn btn-lg w-50">Log in</Link>
					<Link to="/signup" className="signup-btn btn btn-lg w-50">Sign up</Link>
				</form>	
			</div>
			<div className="right mt-5">
				<Logo class="logo" height="300" width="300"/>
			</div>
		</div>
	);
}

export default Home;
