import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './addpro.css';

function Addprodcut({ isFromProductUpdate, apiUrl, requestType }) {
    const Url = process.env.REACT_APP_SERVER_URL;
    const [itemData, setItemData] = useState({
        ProductName: isFromProductUpdate?.ProductName || '',
        ProductPrice: isFromProductUpdate?.ProductPrice || '',
        stock: isFromProductUpdate?.Stock == 0 ? '0' : isFromProductUpdate?.Stock || '',
        Description: isFromProductUpdate?.Description || '',
        Category: isFromProductUpdate ? (JSON.parse(isFromProductUpdate?.Category)) : '' || '',
        item_img: [],
        HighligthPoint: isFromProductUpdate ? (isFromProductUpdate?.HighligthPoint) : '' || [],
    });
    const [alertMessage, setAlertConfig] = useState({
        message: '',
        messageType: 'success'
    });
    // console.log(typeof isFromProductUpdate.Category[0]);
    const api = apiUrl || 'auth/admin/addProduct';
    const methodType = requestType || 'POST';
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'item_img') {
            setItemData((prevData) => ({
                ...prevData,
                item_img: files,
            }));
        } else if (name === 'Category') {
            // Handle Category as an array
            setItemData((prevData) => ({
                ...prevData,
                [name]: value.split(',').map((category) => category.trim()),
            }));
        } else if (name === 'HighligthPoint') {
            setItemData((prevData) => ({
                ...prevData,
                [name]: value
                // [name]: value.split(',').map((val) => val.trim()),
            }));
        }
        else {
            setItemData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const notify = () => {
        toast[alertMessage.messageType](alertMessage.message, {
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
        if (alertMessage.message !== '') {
            notify();
        }
    }, [alertMessage])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('ProductName', itemData.ProductName);
        formData.append('ProductPrice', itemData.ProductPrice);
        formData.append('Stock', itemData.stock);
        formData.append('Description', itemData.Description);
        formData.append('Category', JSON.stringify(itemData.Category)); // Convert array to JSON string
        formData.append('HighligthPoint', JSON.stringify(itemData.HighligthPoint)); // Convert array to JSON string
        if (itemData.item_img.length > 0) {
            for (let i = 0; i < itemData.item_img.length; i++) {
                formData.append('item_img', itemData.item_img[i]);
            }
        }

        const responce = await fetch(`${Url}${api}`, {
            method: methodType,
            body: formData,
            credentials: 'include',
        })
        const result = await responce.json();
        console.log(result);
        setAlertConfig({ message: result.message, messageType: result.success === 'true' ? 'success' : 'error' });
        // .then((response) => response.json())
        // .then((result) => {
        //     console.log(result);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    };

    return (
        <div className='divadmin'>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    name="ProductName"
                    placeholder="Item Name"
                    value={itemData.ProductName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="ProductPrice"
                    placeholder="Item Price"
                    value={itemData.ProductPrice}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="stock"
                    placeholder="Stock"
                    value={itemData.stock}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="Description"
                    placeholder="Description"
                    value={itemData.Description}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="Category"
                    placeholder="Category (comma-separated)"
                    value={itemData?.Category ? itemData.Category.join(', ') : ''}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="HighligthPoint"
                    placeholder="HighligthPoint (comma-separated)"
                    value={itemData.HighligthPoint}
                    onChange={handleInputChange}
                />
                <input type="file" name="item_img" multiple onChange={handleInputChange} />
                <button type="submit">Upload</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Addprodcut;
