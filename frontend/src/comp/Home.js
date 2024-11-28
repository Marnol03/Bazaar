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
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    try {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = currentCart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error);
      setCartCount(0);
    }
  }, []);

  return (
    <>
      <Nav />
      <BarreRecherche cartCount={cartCount} />
      <Categories />
      <Autop setCartCount={setCartCount}/>
      <Art setCartCount={setCartCount}/>
      <Footer />
    </>
  );
}

const BarreRecherche = ({ cartCount }) => {
  const navigate = useNavigate();

  const ConnexionClick = () => {
    navigate('/connexion');
  };
  const handleCartClick = () => {
    navigate('/panier'); 
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
          <div className='iconpanier' onClick={handleCartClick}>
            <FaCartPlus />
            <span className="cart-count">{cartCount}</span>
          </div>
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

const Autop = ({ setCartCount }) => {
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
        console.error("Erreur lors de la récupération des articles en réduction:", error);
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

  {Print(articles)}

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="Au_top">
      <h1>En réduction</h1>
      <div className="carousel">
        <button className="arrow left" onClick={scrollLeft}><FaChevronLeft /></button>
        {console.log(articles)}
        <div className="grid" ref={containerRef}>
          {articles.map((article) => (
            <div key={article.id} className="card" onClick={() => openModal(article)}>
              {article.reduction && <span className="badge-reduction">Réduction!!!</span>}
              <img src={article.imageurl} alt={article.nom} />
              <h3>{article.nom}</h3>
              <p>Prix: <span>{article.prix}</span> FCFA</p>
              <span className='note_prix'>{renderStars(article.note)} {article.note}</span>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={scrollRight}><FaChevronRight /></button>
      </div>
      {selectedArticle && <Modal article={selectedArticle} onClose={closeModal} setCartCount={setCartCount}/>}
    </div>
  );
};

const Modal = ({ article, onClose, setCartCount}) => {

  if (!article) return null;

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = currentCart.find((item) => item.id === article.id);

    if (existingItem) {
      existingItem.quantity += 1; 
    } else {
      currentCart.push({ ...article, quantity: 1 }); // Ajouter un nouvel article
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));

    const totalItems = currentCart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div>
          <img src={article.imageurl} alt={article.nom} />
        </div>
        <div className='desc'>
          <h2>{article.nom}</h2>
          <p>Taille disponible : M, L, XL</p>
          <p>Quantité : 10</p>
          <p className='p_modal'>Prix: <span>{article.prix}</span> FCFA </p>
          <button className='add_card' onClick={addToCart}>
            <IoMdAdd /> Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

const Art = ({ setCartCount }) => {
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
              <img src={article.imageurl} alt={article.nom} />
              {Print(article.imageUrl)}
              <h3>{article.nom}</h3>
              <p>Prix: <span>{article.prix}</span> FCFA</p>
              <span className='note_prix'>{renderStars(article.note)} {article.note}</span>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={scrollRight}><FaChevronRight /></button>
      </div>
      {selectedArticle && <Modal article={selectedArticle} onClose={closeModal} setCartCount={setCartCount}/>}
    </div>
  );
}

const Print = (a) => {
  console.log(a)
};
export default App;
