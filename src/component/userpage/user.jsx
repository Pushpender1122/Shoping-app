import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
// import './user.css'
import Cookies from 'js-cookie';
import Header from '../home/header';
import Alert from '../alerts/alert';
import UserModal from '../model/profileedit';
const UserProfile = () => {
    const [data, setData] = useState([]);
    const [authFailed, setAuthFailed] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [preimg, setpreimg] = useState(null);
    const [buttonState, setButtonState] = useState(true);
    const [showalert, setshowalert] = useState(false);
    const [progress, setProgress] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [fetchDependency, setfetchDependency] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState({
        forImage: false,
        forProfile: false,
        forAddress: false
    });
    const [userdetails, setUserDetails] = useState({
        name: "",
        email: "",
        // image: null
    })
    const [newAddress, setNewAddress] = useState({ label: '', address: '' });
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = Cookies.get('UserId');
                const response = await axios.get(`${apiUrl}auth/user/profile/${id}`, { withCredentials: true });
                if (response.data.message === 'Authentication Failed') {
                    console.log(response.data);
                    setAuthFailed(true);
                } else {
                    setData(response.data.userdetails);
                    setAddresses(response.data.userdetails.addresses);
                }
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [fetchDependency]);
    if (authFailed) {
        return <Navigate to="/" />;
    }

    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
    };
    const handleImageChange = (e) => {
        setNewImage(e?.target?.files[0]);
        const file = e?.target?.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setpreimg(reader.result);
                // setNewImage(reader.result);
                setButtonState(false);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setButtonState(true);
            const id = Cookies.get('UserId'); // Get the user ID from cookies or wherever it's stored
            // Convert the image data (newImage) to a FormData object
            setProgress(20);
            const formData = new FormData();
            formData.append('profileimage', newImage); // Assuming 'image' is the field name expected by the backend
            setProgress(50);
            const result = await axios.post(`${apiUrl}auth/user/profile/${id}/edit/profileimage`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data for file upload
                },
            });
            setProgress(70);
            console.log(result);
            if (result.data.message) {
                if (fetchDependency) {
                    setfetchDependency(false);
                }
                else {
                    setfetchDependency(true);
                }
                setProgress(100);
                setShowModal({
                    ...showModal,
                    forImage: false
                });
                setpreimg(null);
                setNewImage(null);
                setshowalert(true);
                // setButtonState(false);
            }
            else {
                setProgress(0);
                setShowModal({
                    ...showModal,
                    forImage: true
                });
                preimg(null);
            }
            setButtonState(false);
            setTimeout(() => {
                setshowalert(false);
            }, 4000);

        } catch (error) {
            console.error('Error uploading image:', error);
            // Handle error state or display an error message to the user
        }
    };
    return (
        <>
            <Header />
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center">
                    {/* Profile Picture */}
                    <div className="w-20 h-20 overflow-hidden rounded-full mr-4">
                        <img src={data.img || "https://images.unsplash.com/photo-1682687982502-1529b3b33f85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D"} alt="Profile" className="w-full h-full object-cover" />                    </div>
                    {/* User Information */}
                    <div>
                        <h1 className="text-2xl font-semibold">Your Profile</h1>
                        <p className="text-gray-500">Manage your account details here.</p>
                    </div>
                    {/* Edit Profile Button */}
                    <button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={() => setShowModal({
                        ...showModal,
                        forImage: true
                    })}>Edit Profile Picture</button>
                    {/* <button onClick={} className="absolute inset-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center text-white text-sm font-semibold focus:outline-none hid ">
                        Edit Image
                    </button> */}
                </div>
                {/* User Details Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <div className="flex justify-between items-center">
                        <div>
                            <p><span className="font-semibold">Name:</span> {data.name}</p>
                            <p><span className="font-semibold">Email:</span> {data.email}</p>
                            <p><span className="font-semibold">Address:</span> {addresses[0]?.address}</p>
                        </div>
                        {/* Edit Details Button */}
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md" onClick={() => setShowModal({
                            ...showModal,
                            forProfile: true
                        })}>Edit Details</button>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Address</h2>
                    {/* Select Address */}
                    <div className="mb-4">
                        <label htmlFor="addressSelect" className="block text-sm font-medium text-gray-700">Select Address</label>
                        <select
                            id="addressSelect"
                            name="addressSelect"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={selectedAddress}
                            onChange={handleAddressChange}
                        >
                            <option value="">Select an address</option>
                            {addresses.map((address, i) => (
                                <option key={i} value={address.address}>{address.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* Create New Address */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Add New Address</h3>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md" onClick={() => setShowModal({ ...showModal, forAddress: true })}>Create New Address</button>
                    </div>
                </div>
                {/* Order History Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Order History</h2>
                    {/* Order List */}
                    <div className="border-t-2 border-gray-200 pt-4">
                        {/* Example Order */}
                        <div className="flex justify-between items-center mb-3">
                            <p className="text-gray-600">Order #1234</p>
                            <p className="text-gray-500">$150</p>
                        </div>
                        {/* Example Order */}
                        <div className="flex justify-between items-center mb-3">
                            <p className="text-gray-600">Order #5678</p>
                            <p className="text-gray-500">$200</p>
                        </div>
                        {/* Add more orders... */}
                    </div>
                </div>
            </div>
            {showModal.forImage && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-80">
                        <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
                        <form encType='multipart/form-data'>
                            <input type="file" name='profileimage' onChange={handleImageChange} />
                            {preimg && <img src={preimg} alt="New Profile" className="mt-4 rounded-lg w-full" />}
                            <button onClick={handleSubmit} type='submit' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4" disabled={buttonState}>Save</button>
                            <button onClick={() => setShowModal({
                                ...showModal,
                                forImage: false
                            })} className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md mt-2" >Cancel</button>
                        </form>
                    </div>
                </div>
            )}
            {showModal.forProfile && (
                <UserModal
                    setDetails={setUserDetails}
                    Details={userdetails}
                    setModel={() => setShowModal({ ...showModal, forProfile: false })}
                    isDataUpdated={setfetchDependency}
                />
            )}
            {showModal.forAddress && (
                <UserModal
                    setDetails={setNewAddress}
                    Details={newAddress}
                    setModel={() => setShowModal({ ...showModal, forAddress: false })}
                    isDataUpdated={setfetchDependency}
                />
            )}
            <LoadingBar
                color='#f11946'
                progress={progress}
                height={4}
                onLoaderFinished={() => setProgress(0)}
            />
            {showalert && <Alert messageType={'success'} Message={'Profile update SuccessFully'} />}
        </>

    );
};

export default UserProfile;
