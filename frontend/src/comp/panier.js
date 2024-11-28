import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Nav from './Nav';
import Footer from './Footer';

const Panier = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth(); 

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);

        // Récupérer les articles du panier depuis la base de données
        if (user) {
        fetch('http://localhost:5001/api/cart', {
            headers: {
            'Authorization': `Bearer ${user.token}`, 
            },
        })
            .then((response) => response.json())
            .then((data) => {
            
            setCartItems((prevItems) => [...prevItems, ...data]);
            })
            .catch((error) => console.error('Erreur de récupération des articles de la base de données:', error));
        }
    }, [user]);

    const handlePayment = () => {
        // Vider le panier dans localStorage
        localStorage.removeItem('cart');
        
        // Rediriger vers la page d'accueil
        navigate('/');
    };

    return (
        <div className="panier-page">
        <Nav    />
        <h1>Panier</h1>
        {cartItems.length === 0 ? (
            <p>Votre panier est vide.</p>
        ) : (
            <div className="cart-items">
            {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                <img src={item.imageurl} alt={item.nom} />
                <div>
                    <h3>{item.nom}</h3>
                    <p>Prix: {item.prix} FCFA</p>
                    <p>Quantité: {item.quantity}</p>
                </div>
                </div>
            ))}
            </div>
        )}
        <button onClick={handlePayment} className="btn-payer">
            Payer
        </button>
        <Footer />
        </div>
    );
};

export default Panier;
