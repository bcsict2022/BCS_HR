import React, { useEffect, useState } from 'react'
import './sidebar.scss'
import { Link, useLocation } from 'react-router-dom'
import { images } from '../../constants'
import sidebarNav from '../../configs/sidebarNav';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const location = useLocation()

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1]
        const activeItem = sidebarNav.findIndex(item => item.section === curPath)

        setActiveIndex(curPath.length === 0 ? 0 : activeItem)
    }, [location])

    const closeSidebar = () => {
        document.querySelector('.main__content').style.transform = 'scale(1) translateX(0)'
        setTimeout(() => {
            document.body.classList.remove('sidebar-open')
            document.querySelector('.main__content').style = ''
        }, 500);
    }

    return (
        <div className='sidebar'>
            <Link to={'/'} className="sidebar__logo">
                <img src={images.logo} alt="" className='h-20 w-44' />
                <div className="sidebar-close" onClick={closeSidebar}>
                    <i className='bx bx-x'></i>
                </div>
            </Link >
            <div className="sidebar__menu">
                {
                    sidebarNav.map((nav, index) => (
                        <Link to={nav.link} key={`nav-${index}`} className={`sidebar__menu__item ${activeIndex === index && 'active'}`} onClick={closeSidebar}>
                            <div className="sidebar__menu__item__icon">
                                {nav.icon}
                            </div>
                            <div className="sidebar__menu__item__txt">
                                {nav.text}
                            </div>
                        </Link>
                    ))
                }
                <div className="sidebar__menu__item">
                    <div className="sidebar__menu__item__icon">
                        <i className='bx bx-log-out'></i>
                    </div>
                    <div className="sidebar__menu__item__txt" onClick={() => {
                        auth.signOut().then((res)=>(
                            toast.success("You have been logged out!")
                        )).catch((err)=>{
                            toast.error("An Error Occured!")
                        })
                    }}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
