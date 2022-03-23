import React from "react"
import { Link } from "react-router-dom"
import closetHomeLogo from "../images/HomeCloset.PNG"
import dreamHomeLogo from "../images/HomeDreamCloset.PNG"
import ourHomeLogo from "../images/HomeOur.PNG"


import "./Home.css"


export const HomePage = (props) => {
    return (
        <>
            <div className="homeLinkContainer">
                <Link className="HomeLinkYas" to="/closet" > <a href="" ><img className="HomeLinks" src={closetHomeLogo} alt="" /></a></Link>
                <Link className="HomeLinkYas" to="/dreamcloset" > <a href="" ><img className="HomeLinks" src={dreamHomeLogo} alt="" /></a></Link>
                <Link className="HomeLinkYas" to="/worldCloset" > <a href="" ><img className="HomeLinks" src={ourHomeLogo} alt="" /></a></Link>















            </div>





        </>
    )








}
