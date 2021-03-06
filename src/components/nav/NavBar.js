import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import LogoImg from "../../images/MainLogo.jpg"

export const NavBar = (props) => {
    return (
        <>
            <div className="TheTop">
                <img class="MainLogo" src={LogoImg} alt="" />

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

                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/home">Home</Link>
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
            </div>
        </>

    )

}