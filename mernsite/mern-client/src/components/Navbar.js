import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = (props) => {



    return(
        <div>
        <div className="navbarTop"/>
        <nav className="navbar d-flex flex-row sticky-top justify-content-md-between justify-content-sm-center justify-content-xs-center">

                <div/>
                <Link className="nav-item align-middle font-weight-light " to="/home">
                  Home
                </Link>

                <Link className="nav-item align-middle font-weight-light " to="/about">
                  About
                </Link>

                <Link className="nav-item align-middle font-weight-light " to="/art">
                  Artwork
                </Link>

                <Link className="nav-item align-middle font-weight-light " to="/contact">
                  Contact
                </Link>
                <div/>



        </nav>
        </div>
    )
};

export default Navbar;