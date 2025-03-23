import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
const CheckoutPage = ({ isPopupOpen, setPopupOpen, grandTotal }) => {
    // const [isPopupOpen, setPopupOpen] = useState(false);
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addressList, setAddressList] = useState([]);
    const [user, setUser] = useState(null);
    const [cartItem, setCartItems] = useState([]);
    const [alertoption, setAlertMessage] = useState({
        alertType: "success",
        alertMessage: ""
    })
    const navigate = useNavigate();
    useEffect(() => {
        const userId = Cookies.get('UserId') || null;

        async function fetchData() {
            const response = await axios.get(`${apiUrl}auth/user/profile/${userId}`, { withCredentials: true });
            console.log(response.data.userdetails);
            setUser(response.data.userdetails);
            setAddressList(response.data.userdetails.addresses);
            // setSelectedAddress(response.data.userdetails.addresses);
        }
        if (userId) {
            fetchData();
        }

    }, [])
    useEffect(() => {
        const fetchCartItems = () => {
            const userId = Cookies.get('UserId') || null;
            if (userId) {
                const storedUserCartItems = JSON.parse(localStorage.getItem(`CartList_${userId}`));
                setCartItems(storedUserCartItems || []);
            }
        };

        fetchCartItems();
    }, []);
    const notify = () => {
        toast[alertoption.alertType](alertoption.alertMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    useEffect(() => {
        if (alertoption.alertMessage !== '') {
            notify();
        }
    }, [alertoption])

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        console.log(cartItem);
        let newObj = cartItem;
        newObj[0].address = address;
        setCartItems(newObj);
        setPopupOpen(false);
    };
    const creatOrder = async () => {
        const userId = Cookies.get('UserId') || null;
        // if (!selectedAddress) {
        //     alert('Please select address');
        //     return;
        // }
        if (!userId) {
            setAlertMessage({
                alertType: "error",
                alertMessage: "Please login first"
            })
            // alert('Please login first');
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}order`, { cartItem }, { withCredentials: true });
            console.log(response.data);
            payment(response.data.order_id, response.data.amount, response.data.currency);
        }
        catch (error) {
            setAlertMessage({
                alertType: "error",
                alertMessage: "Something went wrong"
            })
        }
    }
    const handleCheckout = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
        const userId = Cookies.get('UserId') || null;
        if (userId) {
            const result = await axios.post(`${apiUrl}auth/user/profile/${userId}/orders/createorder`, { "data": cartItem, razorpay_order_id, razorpay_payment_id, razorpay_signature }, { withCredentials: true });
            console.log(result);
            if (result.data.message == "Orders placed successfully") {
                setAlertMessage({
                    alertType: "success",
                    alertMessage: result.data.message
                });
                navigate('/paymentsuccess', { state: { isPaymentTrue: true } });
                setCartItems([]);
                localStorage.clear(`CartList_${userId}`);
                localStorage.clear(`TempCart${userId}`);

            } else {

                setAlertMessage({
                    alertType: "error",
                    alertMessage: result.data.message
                });
            }
        }
        else {
            setAlertMessage({
                alertType: "info",
                alertMessage: "Please login first "
            });
        }
    }
    const payment = async (order_id, amount, currency) => {
        const response = await axios.get(`${apiUrl}auth/user/getrazerToken`, { withCredentials: true });
        console.log(response.data);
        let key = response.data.key_id;
        var options = {
            key,
            amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: currency,
            name: "Pushpender", //your business name
            description: "Test Transaction",
            image: user.img || "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg",
            order_id,
            handler: async function (response) {
                // response._id=order_id;
                let paymentCheck = await axios.post(`${apiUrl}verifyPayment`, response, { withCredentials: true });
                setAlertMessage({
                    alertType: paymentCheck.data.success ? "success" : "error",
                    alertMessage: paymentCheck.data.message
                })
                if (paymentCheck.data.success) {
                    handleCheckout(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
                }
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
            },
            prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                name: user.name, //your customer's name
                email: user.email,
                contact: "9000090000"  //Provide the customer's phone number for better conversion rates 
            },
            notes: {
                address: selectedAddress
            },
            theme: {
                color: "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            setAlertMessage({
                alertType: "error",
                alertMessage: response.error.description
            })
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.bg-white') && !event.target.classList.contains('checkout')) {
                setPopupOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isPopupOpen]);


    return (
        <div className="container mx-auto mt-8">
            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Select Address</h2>
                        <ul>
                            {addressList.map((add, index) => (
                                <li key={index} onClick={() => handleAddressSelect(add.address)} className="cursor-pointer flex justify-between items-center py-2 px-4 border-b border-gray-200">
                                    <div onClick={creatOrder}>
                                        <span className="font-bold">{add.label}: </span>
                                        <span>{add.address}</span>
                                    </div>
                                    <div className="text-blue-500" >Select</div>
                                </li>
                            ))}
                            <Link to={'/user/profile'}>Add new address</Link>
                        </ul>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );


};

export default CheckoutPage;
