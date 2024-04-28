import React, { useEffect } from 'react';

const Modal = ({ image, alt, onClose }) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.zoom-img-user')) {

                onClose();
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 zoom-img-user">
            <div className="max-w-lg w-full bg-white p-4 rounded-lg overflow-hidden">
                <img src={image || "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"} alt={alt} className="w-full h-full object-cover" />
                <button className="absolute top-0 right-0 p-2" onClick={(event) => { event.stopPropagation(); onClose(); }}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
