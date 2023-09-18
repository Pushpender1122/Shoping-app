import React, { useState } from 'react'
import './spage.css'
import logo from '../img/logo.jpg'
import { Link } from 'react-router-dom'
const Spage = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [validData, setValidData] = useState({
        name: "",
        email: "",
    })

    const sendData = (e) => {
        e.preventDefault();
        fetch('http://localhost:7000/auth/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setValidData((preData) => ({
                    ...preData,
                    name: result.Name,
                    email: result.Email
                }));
                if (result.message === "User Created Succesfull") {
                    alert("User Created Succesfull");
                    setData((prevData) => ({
                        ...prevData,
                        name: "",
                        email: "",
                        password: "",
                    }));
                }
                if (result.message === "User Already exist") {
                    alert("User Already exist");
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const handleName = (e) => {
        // console.log(e.target.value);
        setData((prevData) => ({
            ...prevData,
            name: e.target.value
        }));
        setValidData((preData) => ({
            ...preData,
            name: "",
        }));
    }
    const handleEmail = (e) => {
        // console.log(e.target.value);
        setData((prevData) => ({
            ...prevData,
            email: e.target.value
        }));
        setValidData((preData) => ({
            ...preData,
            email: "",
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
            <div className="i4">
                <small>
                    <div className="i2">
                        <h1>Create account</h1>
                        <b>Your name</b><br />
                        <input className="i3" type="text" name='name' value={data.name} onChange={handleName} onKeyUp={(e) => e.code === "Enter" ? sendData(e) : null} />
                        <br /><br />
                        <div className='name-valid'>
                            <label htmlFor="" id='name'>{validData.name}</label>
                        </div>
                        <b>Email</b><br />
                        <input className="i3" type="email" name='email' value={data.email} onChange={handleEmail} onKeyUp={(e) => e.code === "Enter" ? sendData(e) : null} /><br /><br />
                        <div className="name-valid">
                            <label htmlFor="" id='email'>{validData.email}</label>
                        </div>
                        <b>Password</b><br />
                        <input className="i3" type="password" name='password' value={data.password} onChange={handlePassword} onKeyUp={(e) => e.code === "Enter" ? sendData(e) : null} /><br />
                        <small>Password must be at least 6 characters.</small><br /><br />
                        <button className="i1"><Link to="/user/login" onClick={sendData}>Create your X-Market account</Link></button><br /><br />
                        By continuing, you agree to X-Market's <a href="conditions.html">Conditions of Use</a> and <a href="privacy.html">Privacy Notice.</a><br /><br />
                        <hr /><br />
                        Already have an account?<Link to="/user/login">Sign in</Link><br /><br />
                    </div>
                </small>
            </div><br />
            <hr /><br />
            <center>
                <div className="i2">
                    <pre><a href="conditions.html">Conditions of Use</a> <Link to="privacy.html">Privacy Notice</Link> <Link to="https://mail.google.com/mail/u/0/#inbox">Help</Link></pre><br />
                    © 2023, X-Market.com, Inc. or its affiliates
                </div>
            </center>
        </div>
    );
}

export default Spage
