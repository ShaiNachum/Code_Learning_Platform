import React, { useState, useEffect } from 'react';


const Celebration = ({ show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            // Auto-hide after 5 seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 text-center animate-bounce">
                <div className="text-9xl mb-4">😊</div>
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                    Congratulations!
                </h2>
                <p className="text-xl text-gray-700">
                    You've found the correct solution!
                </p>
            </div>
        </div>
    );
};

export default Celebration;