import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Nav.scss';

const Nav = (props) => {
    return (
        <div id="mainnav">
            <nav className="navbar navbar-expand-md">
                <Logo class="navlogo" anchorclass="navbar-logo" height="55" width="55"/>
                <button className="navbar-toggler navbar-btn" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span><i className="fa fa-bars"></i></span>
                </button>

                <div className="collapse navbar-collapse navbg" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/founder" className="nav-item nav-link">Founder</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Nav;