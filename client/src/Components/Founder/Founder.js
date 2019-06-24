import React, { useEffect } from 'react';
import { SocialIcon } from 'react-social-icons';
import './Founder.scss';
import founderimg from './Founder.svg';
import igicon from './ig-icon.svg';

const Founder = (props) => {

    useEffect(() => {
        document.getElementById('mainnav').classList.add('secondary-nav');
        return(() => document.getElementById('mainnav').classList.remove('secondary-nav'));
    });

    return (
        <div className="founder">
            <section className="row text-center">
                <div className="col-lg-12 founderimg">
                    <img className="rounded-circle" src={founderimg} alt="founderimg" height="240" width="240"/>
                </div>
                <div className="col-lg-12 foundername mt-4">
                    <strong>Omar</strong>
                </div>
                <div className="col-lg-12 founderbio mt-5 mb-3">
                    <p className="mt-2 mb-5 px-0">
                        - A Software engineering student at the university of queensland in 
                        Brisbane, Australia. Also, a full-stack MERN developer. I have 
                        experience in multiple programming languages, as well as working 
                        with SQL and NoSQL databases. Moreover, I have worked in software 
                        development and cloud engineering (AWS).
                    </p>
                </div>
            </section>
            <footer className="text-center foundersocial pb-5">
                <SocialIcon target="_blank" className="fb-icon mx-3 my-2" url="https://www.facebook.com/omar.s.alqarni" />
                <SocialIcon target="_blank" className="twitter-icon mx-3 my-2" url="https://twitter.com/OmarBnSaad" />
                <a className="ig-icon" href="https://www.instagram.com/omar.96s/" target="_blank" rel="noopener noreferrer">
                    <img className="mx-3 my-2 rounded-circle" src={igicon} alt="igicon" height="50" width="50"/>
                </a>
                <SocialIcon target="_blank" className="linkedin-icon mx-3 my-2" url="https://www.linkedin.com/in/omar-alqarni-a0594815a/" />
            </footer>
        </div>
    );
}

export default Founder
