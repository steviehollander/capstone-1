import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/closet">My Closet</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/dreamcloset">My Dream Closet</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/worldCloset">Our Closet</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("cm_user")
                        }
                    }>
                    Logout
                </Link>
            </li>
        </ul>

    )
}