import React from 'react'
import { useNavigate } from 'react-router'
import { useUser } from '../UserContext';

export const CloudProfile = () => {

  const { usuario } = useUser();

    const navigate = useNavigate();

  return (
    <aside className='cloud_profile-aside'>
        <button onClick={() => navigate(`../profile/${usuario.id}/`)}>
            Profile
        </button>
        <button onClick={() => navigate("/login")}>
            <img src="/public/logout_logo.png" alt="" width={20} height={20}/>
            Log Out
        </button>
    </aside>
  )
}
