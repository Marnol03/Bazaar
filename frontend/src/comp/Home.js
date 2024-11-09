
import '../css/Home.css';
import React, { useState, useEffect, useRef } from 'react';
import logo from '../images/logo.png';
import jogging from '../images/jogging.jpeg';
import phone from '../images/phone_1.jpeg';
import laptop from '../images/laptop_1.jpg';
import nike from '../images/nike.jpeg';
import jordan from '../images/jordan.jpeg';
import rolex from '../images/rolex.png';


import { FaSearch, FaChevronLeft, FaChevronRight, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Nav from './nav';

function App() {
  return (
    <>
      <Nav/>
      <Barrecherche/>
      <Categories/>
      <Autop/>
      <Art/>
      <Footer/>
    </>  
  );
}



const Barrecherche = () => {
  const navigate = useNavigate();

  const ConnexionClick = () => {
    navigate('/connexion'); 
  };
  return (
    <div>
      <div className='barrecherche'>  
        <img src={logo} className="logo" alt="logo" />
        <div className='recherche'>
          <input type='text' placeholder='Recherche' className='int_recherche'/>
          <div className='iconrecherche'><FaSearch /></div>
        </div>
        <div className='barrecherche_right'>
          <div className='iconpanier' ><FaCartPlus /></div>
          <div className="connexion" onClick={ConnexionClick}>
            <IoIosLogIn />
            <span>Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
const Categories = () => {
  return (
    <div className='barcategorie' >
      <ul>
        <li >  
          <div className='Cat'> Categorie :  </div>
          <select className='' >  
            <option> Chaussure </option> 
            <option> Habits </option> 
            <option> Accesoir </option>
          </select>
        </li>
        <li> <a href='#'> Nouveautes</a></li>
        <li> <a href='#'> Offres </a></li>
        <li> <a href='#'> Tout </a></li>
        <li> <a href='#'> Aide </a></li>
      </ul>
    </div>
  );
}

const renderStars = (note) => {
  const fullStars = Math.floor(note); 
  const halfStar = note % 1 >= 0.5; 
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); 

  return (
    <div className="stars">
      {Array(fullStars).fill(<FaStar />)} 
      {halfStar && <FaStarHalfAlt />} 
      {Array(emptyStars).fill(<FaRegStar />)}
    </div>
  );
};


const Art = () => {
  // simulation de la récupération des articles de la base de données
  const [articles, setArticles] = useState([]);
  const containerRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, nom: 'Jogging', prix: 5425, imageUrl: jogging, note : 2.4 },
        { id: 2, nom: 'Jordan nike', prix: 12954, imageUrl: jordan, note : 4.8 },
        { id: 3, nom: 'Galaxy s22', prix: 145250, imageUrl: phone, note : 4.0 },
        { id: 4, nom: 'Hp computer', prix: 97230, imageUrl: laptop, note : 5 },
        { id: 5, nom: 'Nike', prix: 12954, imageUrl: nike, note : 4.4 },
        { id: 6, nom: 'Rolex', prix: 733839, imageUrl: rolex, note : 3.7 },
      ];
      setArticles(data); 
    };

    fetchData();
  }, []);
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };
  return (
    <div className="Au_top">
      <h1>Nos articles</h1>
      <div className="carousel">
        <button className="arrow left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
        <div className="grid" ref={containerRef}>
          {articles.map((article) => (
            <div key={article.id} className="card">
              <img src={article.imageUrl} alt={article.nom} />
              <h3>{article.nom}</h3>
              <p>Prix: <span>{article.prix}</span> FCFA</p>
              <span className='note_prix'> {renderStars(article.note)} {article.note}</span> 
              <button className='add_card'> add <IoMdAdd /></button>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}


const Autop = () => {
  // simulation de la récupération des articles de la base de données
  const [articles, setArticles] = useState([]);
  const containerRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, nom: 'Jogging', prix: 5425, imageUrl: jogging ,note : 2.4,reduction: true},
        { id: 2, nom: 'Galaxy s22', prix: 145250, imageUrl: phone, note : 4.0,reduction: true },
        { id: 3, nom: 'Hp computer', prix: 97230, imageUrl: laptop, note : 5,reduction: true },
        { id: 4, nom: 'Nike', prix: 12954, imageUrl: nike, note : 4.4,reduction: false },
        { id: 5, nom: 'Jordan nike', prix: 12954, imageUrl: jordan, note : 4.8,reduction: true },
        { id: 6, nom: 'Rolex', prix: 733839, imageUrl: rolex, note : 3.7,reduction: true },
      ];
      setArticles(data); 
    };

    fetchData();
  }, []);
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };
  return (
    <div className="Au_top">
      <h1>En réduction</h1>
      <div className="carousel">
        <button className="arrow left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
        <div className="grid" ref={containerRef}>
          {articles.map((article) => (
            <div key={article.id} className="card">
              {article.reduction && <span className="badge-reduction">Réduction!!!</span>} 
              <img src={article.imageUrl} alt={article.nom} />
              <h3>{article.nom}</h3>
              <p>Prix: <span>{article.prix}</span> FCFA</p>
              <span className='note_prix'> {renderStars(article.note)} {article.note}</span> 
              <button className='add_card'> add <IoMdAdd /></button>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}



export default App;



