import React, { useState } from 'react'
import './spage.css'
// import logo from '../img/logo.jpg'
import { Link } from 'react-router-dom'
import Alert from '../alerts/alert';
const Spage = () => {
    const alertimgurl = 'http://100dayscss.com/codepen/alert.png';
    const successimgurl = 'https://media.istockphoto.com/id/1079725292/vector/green-tick-checkmark-vector-icon-for-checkbox-marker-symbol.jpg?s=612x612&w=0&k=20&c=OvOpxX8ZFuc5NufZTJDbpwGKvgFUmfZjY68MICmEzX4=';
    const [error, setError] = useState('hideElement');
    const [imgerr, seterrimg] = useState(alertimgurl);
    // const [color, setcolor] = useState('#f65656');
    const [success, setsuccess] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const apiUrl = process.env.REACT_APP_SERVER_URL;
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
        // e.preventDefault();
        fetch(`${apiUrl}auth/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                seterrimg(alertimgurl);
                setsuccess('');
                setValidData((preData) => ({
                    ...preData,
                    name: result.Name,
                    email: result.Email,
                    password: result.Password,
                }));
                if (result.message === "User Created Successfully") {
                    // alert("User Created Succesfull");
                    setData((prevData) => ({
                        ...prevData,
                        name: "",
                        email: "",
                        password: "",
                    }));
                    seterrimg(successimgurl);
                    setsuccess(result.message);
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 4000);
                    return;
                    // setError('');
                }
                if (result.message === "User Already exists") {
                    // alert("User Already exist");
                    seterrimg(alertimgurl);
                    setsuccess(result.message);
                    setError('');
                }
                setError('');
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
        <>
            <div className="container">
                <div className="wrapperrr">
                    <div className="frm--create-account">
                        <h1 className="frm__title">Create Account</h1>
                        {/* create account form starts here */}
                        <div className="frm__create__account">
                            <div className="frm-group">
                                <label htmlFor="email1">Your E-Mail</label>
                                <input type="email" id="email1" name='email' value={data.email} onChange={handleEmail} onKeyUp={(e) => e.code === "Enter" ? sendData(e) : null} placeholder="Enter your email" />
                            </div>
                            <div className="frm-group inline">
                                <div className="frm-group">
                                    <label htmlFor="nick1">Name</label>
                                    <input type="text" id="nick1" name='name' value={data.name} onChange={handleName} onKeyUp={(e) => e.code === "Enter" ? sendData(e) : null} placeholder="Enter your name" />
                                    {/* <div className='name-valid'>
                                        <label htmlFor="" id='name'>{validData.name}</label>
                                    </div> */}
                                </div>
                                <div className="frm-group">
                                    <label htmlFor="pass1">Password</label>
                                    <input type="password" id="pass1" name='password' required value={data.password} onChange={handlePassword} onKeyUp={(e) => e.code === "Enter" ? sendData(e) : null} placeholder="Enter your password" />
                                </div>
                            </div>
                            <div className="frm-info">
                                <p className="frm__txt">
                                    By creating an account you agree to the<br />
                                    <a href="#" className="frm__link">
                                        Terms of Services
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="frm__link">
                                        Privacy Policy
                                    </a>
                                </p>
                            </div>
                            <div className="frm-group">
                                <input type="submit" className="frm__btn-primary" value="Sign Up" onClick={sendData} />
                                <Link to='/user/login' className="loginbtn frm__btn-primary" >Log In</Link>
                            </div>

                        </div>
                        {/* /.create account form starts here */}
                    </div>
                </div>
            </div>
            <div className={`frame ${error}`}>
                <div className={`modal`}>
                    <img src={imgerr} width="44" height="38" alt="Alert" />
                    <span className="title">{success}</span>
                    <p>{validData.name}
                        <br />
                        {validData.email}
                        <br />
                        {validData.password}</p>
                    <div className="button" style={imgerr === 'http://100dayscss.com/codepen/alert.png' ? { backgroundColor: '#f65656' } : { backgroundColor: 'green' }} onClick={() => { setError('hide') }}>OK</div>
                </div>
            </div>
            {showAlert && <Alert messageType={'success'} Message={'User Created Successfully'} />}
        </>

    );
}

export default Spage
