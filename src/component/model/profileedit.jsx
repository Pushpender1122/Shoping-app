import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import Alert from '../alerts/alert';

const UserModal = ({
    setDetails,
    Details,
    setModel,
    isDataUpdated
}) => {
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    const [showalert, setshowalert] = useState(false);
    const [buttonState, setButtonState] = useState(false);
    const [alertMessage, setAlertMessage] = useState({
        messageType: "success",
        message: "Updated"
    })
    isDataUpdated(false);
    const handleSave = async () => {
        setButtonState(true);
        const id = Cookies.get("UserId");
        try {
            const response = await axios.post(`${apiUrl}auth/user/profile/${id}/edit/profile/details`, Details, {
                withCredentials: true
            })
            console.log(response);
            if (response.statusText === 'OK') {
                setAlertMessage({
                    messageType: "success",
                    message: response.data.message
                })
                setshowalert(true);
                setTimeout(() => {
                    setModel(false);
                }, 3500);
                isDataUpdated(true);
            }

        } catch (error) {
            console.log(error);
            setshowalert(true);
            setAlertMessage({
                messageType: 'error',
                message: error?.response?.data?.message
            })
        }
        setTimeout(() => {
            setshowalert(false);
        }, 4000);
    }

    const handleDetails = (e) => {
        setDetails({
            ...Details,
            [e.target.name]: e.target.value
        })
    }

    const getLabel = (key) => {
        // Modify the key to capitalize the first letter
        return key.charAt(0).toUpperCase() + key.slice(1);
    }

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
            <div className="bg-white p-6 rounded-md z-20">
                <h2 className="text-lg font-semibold mb-4">Edit Details</h2>
                {Object.keys(Details).map((key, index) => (
                    <div className="mb-4" key={index}>
                        <label htmlFor={key} className="block mb-1">{getLabel(key)}:</label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={Details[key]}
                            onChange={handleDetails}
                            className="border border-gray-300 rounded-md px-3 py-1 w-full"
                        />
                    </div>
                ))}
                <div className="flex justify-end">
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" disabled={buttonState}>Save</button>
                    <button onClick={() => { setModel(false) }} className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
                </div>
            </div>
            {showalert && <Alert messageType={alertMessage.messageType} Message={alertMessage.message} />}
        </div>

    );
};

export default UserModal;
