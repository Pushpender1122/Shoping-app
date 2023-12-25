import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Alert({ messageType, Message }) {
    useEffect(() => {
        if (messageType && Message) {
            notify();
        }
    }, [messageType, Message]);

    const notify = () => {
        toast[messageType](Message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <ToastContainer
        />
    );
}

export default Alert;
