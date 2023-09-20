import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function AvatarDetails() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        navigate('/login');
    };
    
    return (
        <>
            <div className="mainDiv">
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right show"
                    style={{ background: 'rgb(39, 39, 39)',border: '1px solid rgba(177, 141, 95, 0.65)',boxShadow: 'rgb(195, 161, 119) 0px 0px 15px',left: 'inherit',top: '0',right: 0}}>

                    <div className="dropdown-divider" onClick={() => { navigate('/ProfilePAge') }} />
                    <div className="dropdown-item drop_items">
                        <span className='w-full flex' onClick={() => { navigate('/ProfilePAge') }}>
                            <img src="https://presale.golteum.io/static/media/nav2.809346c5.svg" />
                            <span>My Profile</span>
                        </span>
                    </div>
                    <div className="dropdown-item drop_items" onClick={handleLogout}>
                        <span className='w-full flex'>
                            <img src="https://presale.golteum.io/static/media/logout.490c019d.svg" />
                            <span>Logout</span>
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AvatarDetails;