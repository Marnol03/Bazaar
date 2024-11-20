// Notification.js
import React, { useState, useEffect } from 'react';
import './notification.css';

const Notification = ({ message, duration = 5000, onClose }) => {
    const [width, setWidth] = useState(1);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setWidth((prev) => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        setIsVisible(false); 
                        onClose(); 
                        return 0;
                    }
                return prev + 0.5; 
            });
        }, duration / 200); 

        return () => clearInterval(interval); // Cleanup on unmount
    }, [duration, onClose]);

    return (
    isVisible && (
        <div className="notification">
                <p>{message}</p>
                <div className="progress-bar">
                    <div className="green-bar" style={{ width: `${width}%` }}></div>
                </div>
        </div>
    )
    );
};

export default Notification;
