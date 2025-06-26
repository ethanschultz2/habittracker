import { IoMdHome } from "react-icons/io";
import { FaWpforms } from "react-icons/fa";
import React from 'react';
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { FaChartLine } from "react-icons/fa6";
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
                <li className="navbar-li">
                    <Link to={"/schedule"} className={"nav-link"}>
                        <GrSchedule className={"navbar-icon"} />
                        <span className="navbar-text">Schedule</span>
                    </Link>
                </li>
                <li className="navbar-li">
                    <Link to={"/chart"} className={"nav-link"}>
                        <FaChartLine className={"navbar-icon"} />
                        <span className="navbar-text">Habit Chart</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
export default NavBar;