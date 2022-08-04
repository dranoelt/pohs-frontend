import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Settings = () => {
    const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='container-1'>
        <div className="div-left">
            <MdAccountCircle style={{width: '8rem', height:'8rem'}}/>
            <span>{user.UserName}</span>
        </div>
        <div className="div-right">
            <div className='set-header mb-3'>
                <span>Settings</span>
            </div>
            <div className='set-menu'>
                <div className='set-menu-item'><Link to='edit-profile' className='link-set'>Edit Profile</Link></div>
                <div className='set-menu-item'><Link to='change-pass' className='link-set'>Change Password</Link></div>
            </div>
        </div>
    </div>
  )
}

export default Settings;