import './nav.css';
import React from "react";
import { FaDownload } from "react-icons/fa6";
import { LiaCarSideSolid } from "react-icons/lia";


const Nav = () => {
    return (
        <>
            <div className='trait' ></div>
            <div className="nav" >
                <div className='camion'><span><LiaCarSideSolid /></span> Livraison</div>
                <div className='telecharger'> <FaDownload /> Telecharger <b>Baazar-app</b></div>
            </div>
        </>
    );
}

export default Nav; 