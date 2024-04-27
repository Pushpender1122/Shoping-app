// PaymentSuccess.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let isPaymentTrue = location?.state?.isPaymentTrue;

    useEffect(() => {
        if (!isPaymentTrue) {
            navigate('/');
        }
    }, [isPaymentTrue, navigate]);
    if (!isPaymentTrue) {
        return null
    }
    setTimeout(() => {
        navigate('/');
    }, 2000);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 mb-8" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
            </svg>
            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-lg">Thank you for your purchase.</p>
        </div>
    );
};

export default PaymentSuccess;
