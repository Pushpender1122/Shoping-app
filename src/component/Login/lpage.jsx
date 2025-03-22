import React, { useContext, useEffect, useState } from 'react'
// import logo from '../img/logo.jpg'
import { Link } from 'react-router-dom';
import './login.css'
import Cookies from 'js-cookie';
import Alert from '../alerts/alert';
import { Authentication } from '../context/auth';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { initializeLoginTour as loginTour } from '../configs/tour';
// import { loginTourConfig } from '../configs/tourConfig';
const Lpage = () => {
    // const loginDriver = driver(loginTourConfig)
    useEffect(() => {
        if (!sessionStorage.getItem('loginTour')) {
            loginTour().drive()
            sessionStorage.setItem('loginTour', 'true')
        }
        return () => {
            loginTour().destroy()
        }
    }, [])
    const alertimgurl = 'http://100dayscss.com/codepen/alert.png';
    // const successimgurl = 'https://media.istockphoto.com/id/1079725292/vector/green-tick-checkmark-vector-icon-for-checkbox-marker-symbol.jpg?s=612x612&w=0&k=20&c=OvOpxX8ZFuc5NufZTJDbpwGKvgFUmfZjY68MICmEzX4=';
    const [error, setError] = useState('hideElement');
    const [imgerr, seterrimg] = useState(alertimgurl);
    // const [color, setcolor] = useState('#f65656');
    const [success, setsuccess] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const { setIsAuthenticated } = useContext(Authentication);
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    // const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [validData, setValidData] = useState({
        email: "",
        password: "",
    });
    const [CheckLogin, SetCheckLogin] = useState(true);

    const sendData = async (e) => {
        e.preventDefault();
        if (e.target.name === 'visitor_login') {
            setData(() => ({
                email: 'visitor@gmail.com',
                password: 'visitor'
            }))
        }
        if (e.target.name === 'visitor_login' || isValidData()) {
            try {
                const response = await fetch(`${apiUrl}auth/user/login`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: data.email !== '' ? JSON.stringify({ data }) : JSON.stringify({ data: { email: 'visitor@gmail.com', password: 'visitor' } }),
                });

                const result = await response.json();
                console.log(result);

                if (result.message === 'Email not found') {
                    setValidData((prevData) => ({
                        ...prevData,
                        email: result.message,
                    }));
                }
                if (result.message === 'Password incorrect') {
                    setValidData((prevData) => ({
                        ...prevData,
                        password: result.message,
                    }));
                }
                if (result.message === 'Succesfull login') {
                    SetCheckLogin(false);
                    setTimeout(() => {
                        setData({
                            email: '',
                            password: '',
                        });
                    }, 2000);

                    Cookies.set('Auth', 'Loggedin', { expires: 31 });
                    Cookies.set('UserRole', result.userRole, { expires: 31 });
                    Cookies.set('UserId', result.userId, { expires: 31 });

                    setError('hideElement');
                    setShowAlert(true);

                    setTimeout(() => {
                        setShowAlert(false);
                        setIsAuthenticated({
                            isAuthenticated: true,
                            UserRole: result.userRole,
                        });
                    }, 4000);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        // Validation for password can stay here...

        setTimeout(() => {
            if (!CheckLogin) {
                setError('hideElement');
            } else {
                setError('');
            }
        }, 250);
    };

    const isValidData = () => {
        const isValidEmailFormat = isValidEmail(data.email);
        if (!isValidEmailFormat) {
            setValidData((prevData) => ({
                ...prevData,
                email: "Enter a valid email",
            }));
        }
        if (data.password <= 0) {
            setValidData((prevData) => ({
                ...prevData,
                password: "Enter the password",
            }));
        }
        return isValidEmailFormat && data.password.length >= 1;
    };
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const handleEmail = (e) => {
        setData((prevData) => ({
            ...prevData,
            email: e.target.value,
        }));
        if (e.target.value.length > 4) {
            setValidData((prevData) => ({
                ...prevData,
                email: "",
            }));
        }
    };
    const handlePassword = (e) => {
        // console.log(e.target.value);
        setData((prevData) => ({
            ...prevData,
            password: e.target.value
        }));
    }
    return (
        <>
            <div className="container">
                <div className="wrapperrr">
                    <div className="frm--create-account" style={{ width: "400px" }}>
                        <h1 className="frm__title">Log in </h1>
                        {/* create account form starts here */}
                        <div className="frm__create__account">
                            <div className="frm-group">
                                <label htmlFor="email1">Your E-Mail</label>
                                <input type="email" id="email1" name='email' value={data.email} onChange={handleEmail} onKeyUp={(e) => e.code === "Enter" ? sendData(e) : null} placeholder="Enter your email" />
                            </div>
                            <div className="frm-group inline">
                                <div className="frm-group">
                                    <label htmlFor="pass1">Password</label>
                                    <input type="password" id="pass1" name='password' required value={data.password} onChange={handlePassword} onKeyUp={(e) => e.code === "Enter" ? sendData(e) : null} placeholder="Enter your password" />
                                </div>
                            </div>
                            <div className="frm-group">
                                <input type="submit" className="frm__btn-primary" id='visitor_login' name={'visitor_login'} value="Visitor  Login" onClick={sendData} />
                                <input type="submit" className="frm__btn-primary" value="Log in" onClick={sendData} />
                                <Link to='/user/signup' className="loginbtn frm__btn-primary" >Sign up</Link>
                            </div>

                        </div>
                        {/* /.create account form starts here */}
                    </div>
                </div>
            </div>
            {CheckLogin && <div className={`frame ${error}`}>
                <div className={`modal`}>
                    <div className="w-auto flex justify-center">
                        <img src={imgerr} width="44" height="38" alt="Alert" className='items-center' />
                    </div>
                    <span className="title">{success}</span>
                    <p>{validData.name}
                        <br />
                        {validData.email}
                        <br />
                        {validData.password}</p>
                    <div className="button" style={imgerr == 'http://100dayscss.com/codepen/alert.png' ? { backgroundColor: '#f65656' } : { backgroundColor: 'green' }} onClick={() => { setError('hide') }}>OK</div>
                </div>
            </div>}
            {showAlert && <Alert messageType={'success'} Message={'SuccessFully Login'} />}
        </>
    );
}

export default Lpage
