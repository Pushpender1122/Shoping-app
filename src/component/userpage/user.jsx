import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './user.css'
const UserProfile = () => {
    const [data, setData] = useState([]);
    const [authFailed, setAuthFailed] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:7000/auth/user/profile', { withCredentials: true });
                if (response.data.message === 'Authentication Failed') {
                    console.log(response.data);
                    setAuthFailed(true);
                } else {
                    setData(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (authFailed) {
        return <Navigate to="/" />; // Redirect to another route if authentication fails
    }
    return (
        <div className="box">
            <div>
                <div className='img'>
                    <img src="https://images.unsplash.com/photo-1701735186157-dd4210b62475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="profile img" />
                </div>
                <div className="profile-text">
                    <h2>Username & Email</h2>
                    <p>Name</p>
                    <p>example@gmail.com</p>
                </div>
                <div className="address">
                    <h2>Address</h2>
                    <p className='addre'>Street:  Shop No 1, Lala Compound, Mahakalicave Rd, Near Holy Street Hospital, Andheri (west)</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
