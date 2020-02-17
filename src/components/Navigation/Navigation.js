import React from 'react';
import Logo from '../Logo/Logo';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    
    if(isSignedIn) {
        //window.location.pathname = '/home'
        return (
            <nav className='navigation'>
                <Logo />
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'> Sign Out </p>
            </nav>
        );
    } else {
        
        return (
            <nav className='navigation'>
                <Logo />
                <div className='paras'>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'> Register </p>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'> Sign In </p>
                </div>       
            </nav>
        );
    }
}

export default Navigation;

/*
style={{display: 'flex', justifyContent: 'flex-end'}} 
*/