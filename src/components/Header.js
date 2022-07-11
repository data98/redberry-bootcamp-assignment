import React from 'react';
import './Header.css';
import chessLogo from '../assets/chess-logo.svg';

const Header = () => {
    return (
        <div className="header">
            <header className='header--container'>
                <img src={chessLogo} alt="chess logo" />
                <h1>Redberry Knight Cup</h1>
            </header>
        </div>
    )
}

export default Header;