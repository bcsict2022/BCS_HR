import React from 'react'
import './user-info.scss'
import { auth } from '../../firebase'

const UserInfo = ({ user }) => {
    return (
        <div className='user-info'>
            <div className="user-info__img">
                <img src={auth.currentUser.photoURL} alt="" />
            </div>
            <div className="user-info__name">
                <span>{auth.currentUser.email}</span>
            </div>
        </div>
    )
}

export default UserInfo
