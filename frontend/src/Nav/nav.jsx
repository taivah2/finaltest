import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './nav.css';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(''); 

    const handleClick = (path) => {
        setActiveLink(path);  // Cập nhật active link khi người dùng click
    }

    return (
        <div className="container">
            <nav className="navbar fixed-top bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">THPTNVL</a> 
                </div>
            </nav>
            <div className="sidebar">
                <ul>
                    <li className='li-nav'>
                        <Link 
                            className={`nav-link ${location.pathname === "/" ? 'active' : ''}`}
                            to="/"
                            onClick={() => handleClick('/')}>
                            Giáo viên
                        </Link>
                    </li>
                    <li className='li-nav'>
                        <Link 
                            to="/teacherPosition"
                            className={`nav-link ${location.pathname === "/teacherPosition" ? 'active' : ''}`}
                            onClick={() => handleClick('/teacherPosition')}>
                            Vị trí công tác
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Nav;
