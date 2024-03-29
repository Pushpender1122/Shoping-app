import React, { useState } from 'react';
import './addpro.css';

function Addprodcut() {
    const [itemData, setItemData] = useState({
        ProductName: '',
        ProductPrice: '',
        stock: '',
        Description: '',
        Category: [], // Initialize Category as an array
        item_img: [],
        HighligthPoint: [],
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('ProductName', itemData.ProductName);
        formData.append('ProductPrice', itemData.ProductPrice);
        formData.append('stock', itemData.stock);
        formData.append('Description', itemData.Description);
        formData.append('Category', JSON.stringify(itemData.Category)); // Convert array to JSON string
        formData.append('HighligthPoint', JSON.stringify(itemData.HighligthPoint)); // Convert array to JSON string

        for (let i = 0; i < itemData.item_img.length; i++) {
            formData.append('item_img', itemData.item_img[i]);
        }

        fetch('http://localhost:7000/auth/admin/addProduct', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
                    value={itemData.Category.join(', ')}
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
        </div>
    );
}

export default Addprodcut;
