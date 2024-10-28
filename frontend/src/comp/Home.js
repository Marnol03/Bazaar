import './Home.css';
import React, { useState, useEffect, useRef } from 'react';
import logo from '../images/logo.png';
import { FaSearch, FaChevronLeft, FaChevronRight, FaStar, FaStarHalfAlt, FaRegStar, FaCartPlus } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';

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
          <div className='iconpanier'><FaCartPlus /></div>
          <div className="connexion" onClick={ConnexionClick}>
            <IoIosLogIn />
            <span>Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Categories = () => {
  return (
    <div className='barcategorie'>
      <ul>
        <li>
          <div className='Cat'>Categorie :</div>
          <select>
            <option>Chaussure</option> 
            <option>Habits</option> 
            <option>Accessoire</option>
          </select>
        </li>
        <li><a href='#'>Nouveautes</a></li>
        <li><a href='#'>Offres</a></li>
        <li><a href='#'>Tout</a></li>
        <li><a href='#'>Aide</a></li>
      </ul>
    </div>
  );
};

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

const Autop = () => {
  const [articles, setArticles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/articles'); //pour les reductions
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles en réduction:", error);
      }
    };

    fetchData();
  }, []);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  {Print(articles)}

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="Au_top">
      <h1>En réduction</h1>
      <div className="carousel">
        <button className="arrow left" onClick={scrollLeft}><FaChevronLeft /></button>
        <div className="grid" ref={containerRef}>
          {articles.map((article) => (
            <div key={article.id} className="card">
              {article.reduction && <span className="badge-reduction">Réduction!!!</span>}
              <img src={`http://localhost:5001${article.imageUrl}`} alt={article.nom} />
              <h3>{article.nom}</h3>
              <p>Prix: <span>{article.prix}</span> FCFA</p>
              <span className='note_prix'>{renderStars(article.note)} {article.note}</span>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={scrollRight}><FaChevronRight /></button>
      </div>
    </div>
  );
};

const Modal = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div>
        <img src={`http://localhost:5001${article.imageUrl}`} alt={article.nom} />
        </div>
        <div className='desc'>
          <h2>{article.nom}</h2>
          <p>Taille disponible : M, L, XL</p>
          <p>Quantité : 10</p>
          <span className='note_prix'>{renderStars(article.note)} {article.note}</span>
          <p>Dernier commentaire :</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p className='p_modal'>Prix: <span>{article.prix}</span> FCFA </p>
          <button className='add_card'><IoMdAdd />Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

const Art = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/articles');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

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
        <button className="arrow left" onClick={scrollLeft}><FaChevronLeft /></button>
        <div className="grid" ref={containerRef}>
          {articles.map((article) => (
            <div key={article.id} className="card" onClick={() => openModal(article)}>
              <img src={(article.imageUrl)} alt={article.nom} />
              {Print(article.imageUrl)}
              <h3>{article.nom}</h3>
              <p>Prix: <span>{article.prix}</span> FCFA</p>
              <span className='note_prix'>{renderStars(article.note)} {article.note}</span>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={scrollRight}><FaChevronRight /></button>
      </div>
      {selectedArticle && <Modal article={selectedArticle} onClose={closeModal} />}
    </div>
  );
}

const Print = (a) => {
  console.log(a)
};
export default App;
