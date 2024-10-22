
import React, { useState } from 'react';
import  { FaStar } from 'react-icons/fa';
import logo from '../images/logo.png';
import Sms from '../images/sms.jpeg';
import { FaCartPlus } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import './connexion.css';
 

const Barrecherche = () => {
  return (
    <div>
      <div className='barrecherche'>  
        <img src={logo} className="logo" alt="logo" />
        <div className='langue'>
            <select  id='langue'     >
              <option value="francais" data-image= {<FaStar/>}>Français</option>
              <option value="Anglais" data-image= {<FaStar/>}>Anglais</option>
            </select>
        </div>
        <div className='barrecherche_right'>
          <div className='iconpanier' ><FaCartPlus /></div>
          <div className='connexion' > <IoIosLogIn />Se connecter </div>
        </div>
      </div>
    </div>
  );
}
function ContactForm() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pays, setPays] = useState('cameroun');
  const [mot_de_passe, setMot_de_passe] = useState('');
  const [cmot_de_passe, setCmot_de_passe] = useState('');
  const [numero, setNumero] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifie que tous les champs sont remplis
    if (!name || !email || !mot_de_passe || !cmot_de_passe || !numero) {
      alert('Veuillez remplir tous les champs.');
        return;
    }
     // Vérifie que l'email est conforme
     const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Regex pour valider l'email

     if (!isValidEmail) {
         alert('Veuillez entrer un email valide.');
         return;
     }

      // Vérifie que le mot de passe et la confirmation sont identiques
      if (mot_de_passe !== cmot_de_passe) {
        alert('Les mots de passe ne correspondent pas.');
        return;
      }

    // Vérifie que le numéro de téléphone est au format correct
    const numeroSansPrefixe = numero.trim(); // Supprime les espaces
    const isValidNumero = /^\d{9}$/.test(numeroSansPrefixe); // Vérifie que le numéro est composé de 9 chiffres

    if (!isValidNumero) {
        alert('Le numéro de téléphone doit être exactement 9 chiffres.');
        return;
    }

    
    // Ta logique de soumission ici
    console.log({
        pays,
        name,
        email,
        mot_de_passe,
        cmot_de_passe,
        numero,
    });
};

  return (
    <>
      <Barrecherche />
      
      <form onSubmit={handleSubmit} className='form' align="center">
      <img src={Sms} className="imgcommerce" alt="img" />
          <div>
            <label htmlFor='pays'> <FaStar/>  Pays</label>
            <select  id='pays'   value={pays} onChange={(e) => setPays(e.target.value)} >
              <option value="cameroun" data-image= {<FaStar/>}>Cameroun</option>
            </select>
          </div>

          <div>
            <label htmlFor='name'> <FaStar/>  Nom Complet </label>
            <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="Tapez votre nom..." />
          </div>

          <div>
            <label htmlFor='email'> <FaStar/>  E-mail  </label>
            <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Tapez votre email..." />
          </div>

          <div>
            <label htmlFor='mot_de_passe'> <FaStar/>  Mot de passe  </label>
            <input type='password' id='mot_de_passe' value={mot_de_passe} onChange={(e) => setMot_de_passe(e.target.value)} placeholder="Tapez votre mot de passe ..."  />
          </div>

          <div>
            <label htmlFor='cmot_de_passe'> <FaStar/>  Confirmation   </label>
            <input type='password' id='cmot_de_passe' value={cmot_de_passe} onChange={(e) => setCmot_de_passe(e.target.value)} placeholder="confirmez votre mot de passe ..." />
          </div>

          <div>
            <label htmlFor='numero'> <FaStar/>  Telefone  </label>
            <span class="prefix">+237</span>
            <input type='number' id='numero' value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="confirmez votre mot de passe ..." />
          </div>
          <div>
            <input type='checkbox' id='condition'  /> En cochant vous accepter les condition utilisateur <span className='confition_dutilisateur' > --condition utilisateur--</span>
          </div>



          <button type='submit' className='submit' >Envoyer</button>
      </form>


    </>
 );  
} 


export default ContactForm;
