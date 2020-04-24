import React, { useEffect } from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Logo from '../Logo/Logo';
import './Auth.scss';


const Auth = (props) => {

    useEffect(() => {
        document.body.classList.add('App-form');
        document.getElementById("navbarSupportedContent").classList.remove("show");
        return(() => document.body.classList.remove('App-form'));
    });

    return (
        <section className="form">
            <div className="row align-items-center pt-5 mt-2">
                <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 pt-5 text-center">
                    <div className="form">
                        {props.path === '/login' ? <Login /> : <Signup />}
                    </div>
                </div>
                <div className="right col-lg-5 col-md-5 col-sm-12 col-xs-12 text-center">
                    <Logo class="logo" height="250" width="250"/>
                </div>
            </div>
        </section>
    );
}

export default Auth;