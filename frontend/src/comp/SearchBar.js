import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaCartPlus, FaUserCircle } from "react-icons/fa";
import { IoIosLogIn, IoIosLogOut, IoIosSettings } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'; 
import './SearchBar.css'; 

const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 heure

const SearchBar = ({ cartCount }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        checkSession();

        const interval = setInterval(checkSession, 5000);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            clearInterval(interval);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const checkSession = () => {
        const rawUser = localStorage.getItem("user");
        const loginTime = localStorage.getItem("loginTime");

        let user = null;
        try {
            user = JSON.parse(rawUser);
        } catch (e) {
            user = null;
        }

        if (user && loginTime) {
            const timeElapsed = Date.now() - parseInt(loginTime, 10);
            if (timeElapsed > SESSION_TIMEOUT) {
                handleLogout();
            } else {
                setIsLoggedIn(true);
            }
        } else {
            setIsLoggedIn(false);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleLoginClick = () => {
        navigate('/connexion');
    };

    const handleProfileClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("loginTime");
        setIsLoggedIn(false);
        navigate('/connexion');
    };

    return (
        <div className='barrecherche'>  
            <img src={logo} className="logo" alt="logo" />
            <div className='recherche'>
                <input type='text' placeholder='Recherche' className='int_recherche'/>
                <div className='iconrecherche'><FaSearch /></div>
            </div>
            <div className='barrecherche_right'>
                <div className='iconpanier' onClick={() => navigate('/panier')}>
                    <FaCartPlus />
                    <span className="cart-count">{cartCount}</span>
                </div>

                {isLoggedIn ? (
                    <div className="profil-container" ref={dropdownRef}>
                        <div className="profil" onClick={handleProfileClick}>
                            <FaUserCircle size={34} />
                        </div>

                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <div onClick={() => navigate('/profil')}>
                                    <FaUserCircle size={25} /> Mon Profil
                                </div>
                                <div onClick={() => navigate('/parametres')}>
                                    <IoIosSettings size={25} /> Paramètres
                                </div>
                                <div onClick={handleLogout} className="logout">
                                    <IoIosLogOut size={25} /> Déconnexion
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="connexion" onClick={handleLoginClick}>
                        <IoIosLogIn size={24} />
                        <span>Connexion</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
