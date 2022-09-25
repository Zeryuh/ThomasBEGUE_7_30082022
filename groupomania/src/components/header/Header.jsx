import React from 'react';
import Nav from '../nav/Nav';
import './header.css'
import LogoEntreprise from '../../assets/icon-left-font.jpg';

const Header = (props) => {
    return (
        <header className="header container">
            <div className="">
                <img className="img-entreprise" src={LogoEntreprise} alt="Logo entreprise"/>
            </div>
            <Nav page={props.currentPage} />
        </header>
    );
};

export default Header;