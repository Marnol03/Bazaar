import './footer.css';
import React from "react";
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaTwitter } from "react-icons/fa";


const Footer = () => {
    return (
        <div className='footer'>
            <div>
                <h3>Entreprise</h3>
                <ul>
                    <li><a href='#'>À propos de BAZAAR</a></li>
                    <li><a href='#'>Livraison</a></li>
                    <li><a href='#'>BAZAAR VIP</a></li>
                    <li><a href='#'>Services</a></li>
                    <li><a href='#'>se plaindre</a></li>
                    <li><a href='#'>Réduction pour étudiants</a></li>
                </ul>
            </div>
            <div>
                <h3>Aide et Informations</h3>
                <ul>
                    <li><a href='#'>suivre une commande</a></li>
                    <li><a href='#'>Informations sur commande</a></li>
                    <li><a href='#'>BAZAAR affiliation</a></li>
                    <li><a href='#'>se plaindre</a></li>
                </ul>
            </div>
            <div>
                <h3>Contacts</h3>
                <ul>
                    <li><a href='#'>Nous contacter</a></li>
                    <li><a href='#'>payment et taxes</a></li>
                    <li><a href='#'>Groupe Whatsapp</a></li>
                </ul>
            </div>
            <div>
                <h3>Retrouvez nous sur :</h3>
                <div className='logos'><FaFacebook/><FaInstagram/><FaYoutube/><FaTiktok/><FaTwitter /></div>
                <p>Restez Informé de toute nos nouveautées</p>
                <div >
                    <input type='text' placeholder='abdc@gmail.com' className='news'/>
                    <button className='news btn' >s´enregistrer</button>
                </div>
            </div>
        </div>
    );
}

export default Footer; 