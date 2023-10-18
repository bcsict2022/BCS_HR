import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blank from './pages/Blank'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import Products from './pages/Products'
import CreateProducts from './pages/CreateProducts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from './firebase'
import Login from './pages/Login'
import Customers from './pages/Customers'
import AllVideos from './pages/AllVideos'
import Orders from './pages/Orders'
import NewVideo from './pages/NewVideo'
import OrderAttempts from './pages/OrderAttempts'
import SuccessfulDelivery from './pages/SuccessfulDelivery'

function App() {
    const [authenticated, setAuthenticated] = useState()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        })
    }, []);

    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={authenticated?<MainLayout />:<Login/>}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="sucDev" element={<SuccessfulDelivery />} />
                    <Route path="orderAttempts" element={<OrderAttempts />} />
                    <Route path="products" element={<Products />} />
                    <Route path="hero" element={<AllVideos/>} />
                    <Route path="newvideo" element={<NewVideo/>} />
                    <Route path="create_product" element={<CreateProducts />} />
                    <Route path="customers" element={<Customers/>} />
                    <Route path="settings" element={<Blank />} />
                    <Route path="stats" element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
