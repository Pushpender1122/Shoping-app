import React, { useContext, useState } from 'react'
import logo from '../img/logo.jpg'
import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import Cookies from 'js-cookie';
import Alert from '../alerts/alert';
import { Authentication } from '../context/auth';
const Lpage = () => {
    const alertimgurl = 'http://100dayscss.com/codepen/alert.png';
    const successimgurl = 'https://media.istockphoto.com/id/1079725292/vector/green-tick-checkmark-vector-icon-for-checkbox-marker-symbol.jpg?s=612x612&w=0&k=20&c=OvOpxX8ZFuc5NufZTJDbpwGKvgFUmfZjY68MICmEzX4=';
    const [error, setError] = useState('hideElement');
    const [imgerr, seterrimg] = useState(alertimgurl);
    const [color, setcolor] = useState('#f65656');
    const [success, setsuccess] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const { setIsAuthenticated } = useContext(Authentication);
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [validData, setValidData] = useState({
        email: "",
        password: "",
    });
    const [CheckLogin, SetCheckLogin] = useState(0);

    const sendData = (e) => {
        e.preventDefault();
        if (data.email.length > 5 && data.password.length >= 1) {
            setValidData((prevData) => ({
                ...prevData,
                email: "",
                password: ""
            }));
            fetch(`${apiUrl}auth/user/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),

            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.message === 'Email not found') {
                        setValidData((prevData) => ({
                            ...prevData,
                            email: result.message
                        }));
                    }
                    if (result.message === 'Password incorrect') {
                        SetCheckLogin(0);
                        setValidData((prevData) => ({
                            ...prevData,
                            password: result.message
                        }));
                    }
                    if (result.message === "Succesfull login") {
                        // Set cookie with 1-hour expiration
                        console.log(result.message);
                        SetCheckLogin(1);
                        setTimeout(() => {
                            setData({
                                email: '',
                                password: ''
                            })
                        }, 2000);
                        // setIsAuthenticated(true);
                        Cookies.set('Auth', 'Loggedin', { expires: 1 / 24 }); // 1/24 represents 1 hour (1 hour = 1/24 days)
                        Cookies.set('UserRole', result.userRole, { expires: 1 / 24 }); // 1/24 represents 1 hour (1 hour = 1/24 days)
                        Cookies.set('UserId', result.userId, { expires: 1 / 24 }); // 1/24 represents 1 hour (1 hour = 1/24 days)
                        setError('hideElement');
                        setShowAlert(true);
                        setTimeout(() => {
                            setShowAlert(false);
                            setIsAuthenticated({
                                isAuthenticated: true,
                                UserRole: result.userRole
                            });
                            // navigate('/');
                        }, 4000);

                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        if (data.email.length <= 4) {
            setValidData((prevData) => ({
                ...prevData,
                email: "Enter valid email"
            }));
        }
        if (data.email.length > 4) {
            setValidData((prevData) => ({
                ...prevData,
                email: ""
            }));
        }
        if (data.password.length <= 0) {
            setValidData((prevData) => ({
                ...prevData,
                password: "Enter a password"
            }));
        }
        if (data.password.length > 0) {
            setValidData((prevData) => ({
                ...prevData,
                password: ""
            }));
        }
        setTimeout(() => {
            if (CheckLogin) {
                setError('hideElement');
            }
            else {
                setError('');
            }
        }, 250);
    }
    const handleEmail = (e) => {
        // console.log(e.target.value);
        setData((prevData) => ({
            ...prevData,
            email: e.target.value
        }));

    }
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
                                <input type="submit" className="frm__btn-primary" value="Log in" onClick={sendData} />
                                <Link to='/user/signup' className="loginbtn frm__btn-primary" >Sign up</Link>
                            </div>

                        </div>
                        {/* /.create account form starts here */}
                    </div>
                </div>
            </div>
            {CheckLogin ? null : <div className={`frame ${error}`}>
                <div className={`modal`}>
                    <img src={imgerr} width="44" height="38" alt="Alert" />
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
