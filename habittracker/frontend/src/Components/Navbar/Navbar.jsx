import { IoMdHome } from "react-icons/io";
import { FaWpforms } from "react-icons/fa";
import React from 'react';
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import './Navbar.scss';
const NavBar = () => {
    return(
        <nav className="navbar">
            <ul className="navbar-ul">
                <li className="navbar-li">
                    <Link to={"/"} className={"nav-link"}>
                        <IoMdHome className={"navbar-icon"} />
                        <span className="navbar-text">Home</span>
                    </Link>
                </li>
                <li className="navbar-li">
                    <Link to={"/form"} className={"nav-link"}>
                        <FaWpforms className={"navbar-icon"} />
                        <span className="navbar-text">Habit Form</span>
                    </Link>
                </li>
                <li className="navbar-li">
                    <Link to={"/list"} className={"nav-link"}>
                        <FaClipboardList className={"navbar-icon"} />
                        <span className="navbar-text">Habits</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
export default NavBar;