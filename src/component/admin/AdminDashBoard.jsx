import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { Line } from 'react-chartjs-2';
import Addprodcut from './addprodcut';
import { MdOutlineCancel } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import { IoIosArrowDown } from "react-icons/io";
import './admin.css'
import { useNavigate } from 'react-router-dom';



const Url = process.env.REACT_APP_SERVER_URL;

function AdminPanel() {
    const navigate = useNavigate();
    const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
    const [pathList, setPathList] = useState(null);

    const handleMenuClick = (item) => {
        setSelectedMenuItem(item);
    };

    return (
        <>
            <div className='w-screen h-10 bg-emerald-500 sm:hidden' onClick={() => pathList == 'admin-panel' ? setPathList(null) : setPathList('admin-panel')}>
                <IoIosArrowDown className='text-3xl absolute right-1 top-2' />
            </div>
            <div className="flex ">
                <div className={`w-1/4 h-screen bg-gray-200 hidden sm:block ${pathList}`}>
                    <div className="p-4">
                        <div className='absolute right-3 block sm:hidden' onClick={() => setPathList(null)}>
                            <MdOutlineCancel className='text-2xl' />
                        </div>
                        <h1 className="hidden sm:block text-xl font-bold mb-4 ">Admin Panel</h1>
                        <ul className="space-y-2 admin-path-list">
                            <li><div onClick={() => { return handleMenuClick('home'), setPathList(null) }} className="block py-2 px-4 rounded hover:bg-gray-300 cursor-pointer" >Home</div></li>
                            <li><div onClick={() => { return handleMenuClick('dashboard'), setPathList(null) }} className="block py-2 px-4 rounded hover:bg-gray-300 cursor-pointer" >Dashboard</div></li>
                            <li><div onClick={() => { return handleMenuClick('products'), setPathList(null) }} className="block py-2 px-4 rounded hover:bg-gray-300 cursor-pointer">Products</div></li>
                            <li><div onClick={() => { return handleMenuClick('customers'), setPathList(null) }} className="block py-2 px-4 rounded hover:bg-gray-300 cursor-pointer">Customers</div></li>
                            <li><div onClick={() => { return handleMenuClick('transactions'), setPathList(null) }} className="block py-2 px-4 rounded hover:bg-gray-300 cursor-pointer">Transactions</div></li>
                        </ul>
                    </div>
                </div>
                <div className="w-3/4 h-screen bg-white overflow-y-scroll admin-control-panel">
                    {selectedMenuItem === 'dashboard' && <Dashboard />}
                    {selectedMenuItem === 'home' && navigate('/')}
                    {selectedMenuItem === 'products' && <Products />}
                    {selectedMenuItem === 'customers' && <Customers />}
                    {selectedMenuItem === 'transactions' && <Transactions />}
                </div>
            </div>
        </>
    );
}

function Dashboard() {
    const [data, setData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            await axios.get(`${Url}auth/admin/dashboard`, { withCredentials: true }).then((responce) => {
                setData(responce.data);
                console.log(responce.data)
            })
        }
        fetchData();

    }, [])
    const lineData = {
        labels: ['Initialamount', 'AmountEarned'],
        datasets: [
            {
                label: 'Total Amount',
                backgroundColor: 'rgba(75,192,192,0.4)',
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                id: 1,
                // label: '',
                data: [0, data.amountEarned],

            }

        ]
    }
    const pieData = {
        labels: ['OUT of Stock', 'In Stock'],
        datasets: [
            {
                label: 'Total Amount',
                backgroundColor: ['#00A6B4', '#6800B4'],
                hoverBackgroundColor: ['#4B5000', '#35014F',],
                data: [data?.OutOfStock, data?.InStock],

            }

        ]
    }


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            {/* Add dashboard content here */}
            <div className='w-full h-14 bg-blue-400'>
                <p className='flex justify-center items-center'>
                    Total Amount
                </p>
                <p className='flex justify-center items-center'>₹{data.amountEarned}</p>
            </div>
            <div className='flex justify-center mt-4 product_circle'>
                <div className='h-36 w-36 rounded-full bg-red-400 flex items-center justify-center flex-col mx-6 product-details-admin'>
                    <p className='flex justify-center items-center font-bold'>Product</p>
                    <p className='flex justify-center items-center font-bold '>{data?.productCount}</p>
                </div>

                <div className='h-36 w-36 rounded-full bg-amber-300 flex items-center justify-center flex-col mx-6 product-details-admin'>
                    <p className='flex justify-center items-center font-bold'>Orders</p>
                    <p className='flex justify-center items-center font-bold '>{data?.orderCount}</p>
                </div>

                <div className='h-36 w-36 rounded-full bg-black flex items-center justify-center flex-col mx-6 product-details-admin'>
                    <p className='flex justify-center items-center text-white font-bold '>User</p>
                    <p className='flex justify-center items-center text-white font-bold '>{data?.userCount}</p>
                </div>
            </div>
            <div>
                <div className='graph-admin'>
                    <Line
                        datasetIdKey='id'
                        data={lineData}
                    />
                </div>

                <div className='w-full h-80 flex justify-center' >
                    <Doughnut data={pieData} />
                </div>
            </div>
        </div>
    );
}

function Products() {
    const [products, setProduct] = useState([])
    const [render, setRender] = useState(false);
    const [pageNumber, setPageNumeber] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [showEdit, setEdit] = useState(null);
    const [editableItem, setEditableItem] = useState(null);
    const [alertMessage, setAlertConfig] = useState({
        message: '',
        messageType: 'success'
    });
    const isPreviousDisabled = pageNumber === 1;
    const isNextDisabled = pageNumber === lastPage;
    useEffect(() => {
        const fetchData = async () => {
            let responce = await axios.get(`${Url}productList?page=${pageNumber}`, { withCredentials: true });
            setProduct(responce.data.filterProduct);
            setLastPage(responce.data.lastPage);
            console.log(responce.data);
        };
        fetchData();
    }, [render])
    const handleNextPage = () => {
        if (pageNumber < lastPage) {
            setPageNumeber(pageNumber + 1);
            setRender(!render);
            console.log(pageNumber);
        }
    }
    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumeber(pageNumber - 1);
            setRender(!render);
        }
        console.log(pageNumber)
    }
    const handleManageClick = (transactionId) => {
        let oneProduct = products.find(transaction => transaction._id === transactionId);
        setEditableItem(oneProduct);
        console.log(oneProduct);
        setEdit(true);
        // setSelectedTransaction(transactionId);
    };
    const handleDelete = async (id) => {
        const responce = await axios.delete(`${Url}auth/admin/deleteprodcut/${id}`, { withCredentials: true })
        console.log(responce)
        setAlertConfig({
            message: responce.data.message,
            messageType: responce.data?.success ? 'success' : 'error'
        })
        setEdit(false);
        setRender(!render);
    }
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
    return (
        <div id="products" className="p-4">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={Url + product.img[0]} alt={product.ProductName} className="h-10 w-10 object-contain" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.ProductName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.ProductPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.Stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded mx-2" onClick={() => handleManageClick(product._id)}>Edit</button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded mx-2 hover:bg-red-600" onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center '>

                <GrLinkPrevious
                    className={`mx-5 cursor-pointer ${isPreviousDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={handlePreviousPage}
                    disabled={isPreviousDisabled}
                />
                <GrLinkNext
                    className={`mx-5 cursor-pointer ${isNextDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={handleNextPage}
                    disabled={isNextDisabled}
                />

            </div>
            {showEdit && <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Edit Product</h2>
                        <button onClick={() => setEdit(null)}>&times;</button>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 pr-8 flex flex-col items-center">
                            <img src={Url + editableItem.img[0]} alt={editableItem.productName} className="h-auto w-full mb-4" />
                            <p className="text-lg font-bold">{editableItem.ProductName}</p>
                            <p className="text-sm text-gray-500">${editableItem.ProductPrice}</p>
                        </div>
                        <Addprodcut isFromProductUpdate={editableItem} apiUrl={`auth/admin/updateproduct/${editableItem._id}`} requestType={'PUT'} />
                    </div>
                </div>
            </div>}
            <ToastContainer />
        </div>
    );
}

function Customers() {

    const [customers, setCustomer] = useState([])
    const [pageNumber, setPageNumeber] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [render, setRender] = useState(false);
    const [updatetedItem, setUpdatedItem] = useState(null);
    const [alertMessage, setAlertConfig] = useState({
        message: '',
        messageType: 'success'
    });
    const isPreviousDisabled = pageNumber === 1;
    const isNextDisabled = pageNumber === lastPage;
    useEffect(() => {
        const fetchData = async () => {
            let responce = await axios.get(`${Url}auth/admin/allusers?page=${pageNumber}`, { withCredentials: true });
            setCustomer(responce.data.users);
            setLastPage(responce.data.lastPage);
            console.log(responce.data)
        };
        fetchData();
    }, [render]);
    useEffect(() => {
        if (updatetedItem?.role === 'admin' || updatetedItem?.role === 'user') {
            updateRole();
        }
        if (updatetedItem?.role === 'delete') {
            handleDelete();
        }
    }, [updatetedItem]);
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

    const handleRoleChange = (customerId, newRole) => {
        const index = customers.findIndex(customer => customer._id === customerId);
        if (index !== -1) {
            const updatedCustomers = [...customers];
            updatedCustomers[index] = { ...updatedCustomers[index], role: newRole };
            setCustomer(updatedCustomers);
            console.log(`Change role of customer ${customerId} to ${newRole}`);
            setUpdatedItem({ userID: customerId, role: newRole });
        }
    };
    const updateRole = async () => {
        const responce = await axios.post(`${Url}auth/admin/userrole`, { data: [updatetedItem] }, { withCredentials: true })
        setAlertConfig({
            message: responce.data.message,
            messageType: responce.data?.success ? 'success' : 'error'
        })
        console.log(responce)
        setUpdatedItem(null);
    }
    useEffect(() => {
        if (alertMessage.message !== '') {
            notify();
        }
    }, [alertMessage])
    const handleNextPage = () => {
        if (pageNumber < lastPage) {
            setPageNumeber(pageNumber + 1);
            setRender(!render);
        }
    }
    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumeber(pageNumber - 1);
            setRender(!render);
        }

    }
    const handleDelete = async () => {
        const responce = await axios.delete(`${Url}auth/admin/deleteuser/${updatetedItem.userID}`, { withCredentials: true })
        setAlertConfig({
            message: responce.data.message,
            messageType: responce.data?.success ? 'success' : 'error'
        })
        setUpdatedItem(null);
    }
    const handleDeleteCustomer = (customerId) => {
        // Implement delete logic here
        const index = customers.findIndex(customer => customer._id === customerId);
        if (index !== -1) {
            setUpdatedItem({ userID: customerId, role: 'delete' });
            const updatedCustomers = [...customers];
            updatedCustomers.splice(index, 1);
            setCustomer(updatedCustomers);
        }
        console.log(`Delete customer ${customerId}`);
    };

    return (
        <div id="customers" className="p-4">
            <h2 className="text-2xl font-bold mb-4">Customers</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {customers?.map(customer => (
                            <tr key={customer._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={customer.img || 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg'} alt={customer.name} className="h-10 w-10 rounded-full object-cover" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={customer.role}
                                        onChange={(e) => handleRoleChange(customer._id, e.target.value)}
                                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => handleDeleteCustomer(customer._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center '>

                <GrLinkPrevious
                    className={`mx-5 cursor-pointer ${isPreviousDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={handlePreviousPage}
                    disabled={isPreviousDisabled}
                />
                <GrLinkNext
                    className={`mx-5 cursor-pointer ${isNextDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={handleNextPage}
                    disabled={isNextDisabled}
                />
                <ToastContainer />
            </div>
        </div>
    );
}
function Transactions() {

    const [alertMessage, setAlertConfig] = useState({
        message: '',
        messageType: 'success'
    });

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [transactions, setTransaction] = useState([]);
    const [pageNumber, setPageNumeber] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [render, setRender] = useState(false);
    const [isOrderChangeView, setOrderChangeView] = useState('Pending');
    const isPreviousDisabled = pageNumber === 1;
    const isNextDisabled = pageNumber === lastPage;
    const handleManageClick = (transactionId) => {
        let order = transactions.find(transaction => transaction._id === transactionId);
        console.log(order);
        setSelectedTransaction(order);
        // setSelectedTransaction(transactionId);
    };
    useEffect(() => {
        const fetchData = async () => {
            let responce = await axios.get(`${Url}auth/admin/allorders?page=${pageNumber}&isOrderChangeView=${isOrderChangeView}`, { withCredentials: true });
            // setTransaction(responce.data);
            console.log(responce);
            setLastPage(responce.data.lastPage);
            setTransaction(responce.data.order);
        };
        fetchData();
    }, [render, isOrderChangeView])
    const handleNextPage = () => {
        if (pageNumber < lastPage) {
            setPageNumeber(pageNumber + 1);
            setRender(!render);
        }
    }
    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumeber(pageNumber - 1);
            setRender(!render);
        }

    }
    const handleProcessStatus = async () => {
        try {
            const responce = await axios.post(`${Url}auth/admin/allorders/status`, { data: { orderId: selectedTransaction._id, orderStatus: 'Shipped' } }, { withCredentials: true })

            setAlertConfig({
                message: responce.data.message,
                messageType: responce.data.success ? 'success' : 'error'
            })
            setRender(!render);
            setSelectedTransaction(null);
        }
        catch (error) {
            console.error(error);
        }
    }
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
    const OrderViewChanger = () => {
        // setTransaction(selectedTransaction);
        setOrderChangeView(isOrderChangeView === 'Shipped' ? 'Pending' : 'Shipped');
    }
    useEffect(() => {
        if (alertMessage.message !== '') {
            notify();
        }
    }, [alertMessage])
    return (
        <div id="transactions" className="p-4">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold mb-4">Transactions</h2>
                <h2 className='cursor-pointer' onClick={OrderViewChanger}>{isOrderChangeView == 'Shipped' ? 'Pending Order' : 'All Order'}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map(transaction => (

                            <tr key={transaction._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction?.items.productName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction?.items.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction?.items?.discount || 0}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction?.items?.quantity}</td>
                                <td className={transaction?.orderStatus === 'Pending' ? "text-red-600 px-6 py-4 whitespace-nowrap" : "text-green-500 px-6 py-4 whitespace-nowrap"}>{transaction?.orderStatus}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => handleManageClick(transaction._id)} className="bg-blue-500 text-white px-4 py-2 rounded">Manage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedTransaction && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 flex">
                        <div className="w-1/2 pr-8 flex flex-col items-center">
                            <img src={Url + selectedTransaction.items.image} alt={selectedTransaction.items.productName} className="h-auto w-full mb-4" />
                            <p className="text-lg font-bold">{selectedTransaction.items.productName}</p>
                            <p className="text-sm text-gray-500">${selectedTransaction.items.price}</p>
                        </div>
                        <div className="w-1/2">
                            <button className="absolute top-0 right-0 m-4" onClick={() => setSelectedTransaction(null)}>Close</button>
                            <h3 className="text-xl font-bold mb-4">Order Information</h3>
                            <div className="">
                                <h1>User Info</h1>
                                <p>Name : {selectedTransaction.userId.name}</p>
                                <p>Address : {selectedTransaction.items.address}</p>
                            </div>
                            <div className="mb-2">
                                <h1>Amount Info</h1>
                                <p>Shipping Charges : 0</p>
                                <p>Discount : {selectedTransaction.items.discount}</p>
                                <p>Total : {selectedTransaction.items.total}</p>
                            </div>
                            <div className="my-3">
                                <h1>Status Info</h1>
                                <div className='flex'>
                                    <p className='mr-2'>Status:</p>
                                    <p className={selectedTransaction.orderStatus == 'Pending' ? "text-red-600" : "text-green-500"}> {selectedTransaction.orderStatus}</p>
                                </div>
                            </div>
                            <button onClick={handleProcessStatus} disabled={selectedTransaction.orderStatus === 'Pending' ? false : true}>Process Status</button>
                        </div>
                    </div>
                </div>
            )}
            <div className='flex justify-center '>
                <GrLinkPrevious
                    className={`mx-5 cursor-pointer ${isPreviousDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={handlePreviousPage}
                    disabled={isPreviousDisabled}
                />
                <GrLinkNext
                    className={`mx-5 cursor-pointer ${isNextDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={handleNextPage}
                    disabled={isNextDisabled}
                />
                <ToastContainer />
            </div>
        </div>
    );
}

export default AdminPanel;
