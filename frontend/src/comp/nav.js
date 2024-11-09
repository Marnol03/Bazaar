import '../css/nav.css';
import React from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { LiaCarSideSolid } from "react-icons/lia";


const Nav = () => {
    return (
        <>
            <div className='trait' ></div>
            <div className="nav" >
                <div className='camion'><span><LiaCarSideSolid /></span> Livraison</div>
                <div className='telecharger'> <IoPhonePortraitOutline /> Telecharger <b>Baazar-app</b></div>
            </div>
        </>
    );
}

export default Nav; 