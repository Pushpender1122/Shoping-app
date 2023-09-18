import React, { useState } from 'react'
import logo from '../img/logo.jpg'
import { Link, useNavigate } from 'react-router-dom';

const Lpage = () => {
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
            fetch('http://localhost:7000/auth/user/login', {
                method: 'POST',
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
                    if (result.message == "Succesfull login") {
                        navigate('/');
                        SetCheckLogin(1);
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
        <div>
            <center>
                <div className="i-1">
                    <img src={logo} alt="X-Market.logo" width="100px" height="100px" />
                </div>
            </center>
            <div className="i0">
                <small>
                    <div className="i2">
                        <h1>Log in</h1>
                        <b>Email or mobile phone number</b><br />
                        <i className='bx bxs-user'><input className="i3" type="text" onChange={handleEmail} value={data.email} onKeyUp={(e) => e.code === "Enter" ? sendData(e) : null} /></i>
                        <br /><br />
                        <div className="name-valid">
                            <label htmlFor="">{validData.email}</label>
                        </div>
                        <b>Password</b><br />
                        <input className="i3" type="password" onChange={handlePassword} value={data.password} onKeyUp={(e) => e.code === "Enter" ? sendData(e) : null} /><br /><br />
                        <div className="name-valid">
                            <label htmlFor="">{validData.password}</label>
                        </div>
                        <button className="i1" type="button" onClick={sendData}>Log in</button><br /><br />
                        By continuing, you agree to X-Market's <a href="conditions.html">Conditions of Use</a> and <a href="privacy.html">Privacy Notice.</a><br /><br />
                        <input type="checkbox" />Keep me login.<br />
                        <hr />New to X-Market?<br /><br />
                        <button className="i1"><Link to="/user/signup">Create your X-Market account</Link></button>
                    </div>
                </small>
            </div><br />
            <hr /><br />
            <center>
                <div className="i2">
                    <pre><a href="conditions.html">Conditions of Use</a> <a href="privacy.html">Privacy Notice</a> <a href="https://mail.google.com/mail/u/0/#inbox">Help</a></pre><br />
                    © 2023, X-Market.com, Inc. or its affiliates
                </div>
            </center>
            {CheckLogin}
        </div>
    );
}

export default Lpage
