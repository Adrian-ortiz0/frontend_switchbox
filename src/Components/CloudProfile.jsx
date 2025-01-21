import React from 'react'
import { useNavigate } from 'react-router'

export const CloudProfile = () => {

    const navigate = useNavigate();

  return (
    <aside className='cloud_profile-aside'>
        <button onClick={() => navigate("/profile")}>
            Profile
        </button>
        <button onClick={() => navigate("/login")}>
            <img src="../public/logout_logo.png" alt="" width={20} height={20}/>
            Log Out
        </button>
    </aside>
  )
}
