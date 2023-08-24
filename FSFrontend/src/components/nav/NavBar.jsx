import { useEffect, useState } from "react"

import "../../index.css"
import "./Nav.css"

import { getUserDetails, getUserProfileImageUrl, userLogout } from "../../services/UserService"

import { Box, Button, Typography } from "@mui/material"
import Icon from "react-icons-kit"
import {angleDown} from 'react-icons-kit/fa/angleDown'
import {signOut} from 'react-icons-kit/fa/signOut'
import {user} from 'react-icons-kit/icomoon/user'
import {iosContact} from 'react-icons-kit/ionicons/iosContact'
import { Link } from "react-router-dom"

const NavBar = () => {
  const [userDetails, setUserDetails] = useState([])
  const [settingsDisplay, setSettingsDisplay] = useState(false)

  function handleLogout(){
    userLogout()
  }

  function displayProfileSettings(){
    if(!settingsDisplay){
      setSettingsDisplay(true)
    }else{
      setSettingsDisplay(false)
    }
  }

  useEffect(() => {
    getUserDetails().then(res => {
      setUserDetails(res.data)
    })
  }, [])

  return (
    <div>
      <nav className="nav-bar">
        
        <Typography typography={'p'}
         color={'#fff'} fontSize={'1rem'} position={'relative'} sx={{
          ":before": {
            content: "''",
            position: 'absolute',
            bottom: '0',
            width: '100%',
            height: '.5px',
            background: 'rgba(255,255,255,0.4)',
            boxShadow: '0px 0px 1px 1px rgba(255,255,255, 0.1)'
          }
        }}>{userDetails.username}</Typography>
        <Box sx={{
          width: '35px',
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: 'rgba(80, 80, 80, 0.936)',
          color: '#fff',
          textAlign: 'center'
        }}>
          { userDetails.profileImageId !== null ? <img className="user-profile-img" src={getUserProfileImageUrl()}></img> : <Icon icon={iosContact} size={38}></Icon> }
        </Box>
        <button onClick={displayProfileSettings} className="profile-btn">
          <Icon icon={angleDown} size={18}></Icon>
        </button>
    </nav>

    <Box sx={{
      height: 'auto',
      padding: '1rem',
      background: 'rgba(0,0,54, 0.95)',
      position: 'fixed',
      right: '0',
      top: settingsDisplay ?  '3rem' : '-120px',
      transition: '.5s',
      zIndex: '10'
    }}>
      
      <Link to="/user/profile">
        <Button sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '.4rem',
          color: '#fff',
          borderRadius: '0',
          borderBottom: '1px solid rgba(255,255,255, 0.3)',
          marginBottom: '.5rem'
        }}>Profile <Icon icon={user} size={19}></Icon></Button>
      </Link>

      <Button sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '.4rem',
        color: '#fff',
        borderRadius: '0',
        borderBottom: '1px solid rgba(255,255,255, 0.3)'
      }} onClick={handleLogout}>Log out <Icon icon={signOut} size={19}></Icon></Button>
    </Box>
    </div>
  )
}

export default NavBar