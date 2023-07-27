import { Box, Button } from "@mui/material"
import "../../index.css"
import "./Nav.css"


import Icon from "react-icons-kit"
import {angleDown} from 'react-icons-kit/fa/angleDown'
import {signOut} from 'react-icons-kit/fa/signOut'
import {user} from 'react-icons-kit/icomoon/user'
import { useState } from "react"
import { userLogout } from "../../services/UserService"

const NavBar = () => {

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

  return (
    <div>
      <nav className="nav-bar">
      <Box sx={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: '#fff'
      }}></Box>
      <button onClick={displayProfileSettings} className="profile-btn">
        <Icon icon={angleDown} size={18}></Icon>
      </button>
    </nav>

    <Box sx={{
      height: 'auto',
      padding: '1rem',
      background: 'rgba(0,0,54, 0.95)',
      position: 'absolute',
      right: '0',
      top: settingsDisplay ?  '3rem' : '-120px',
      transition: '.5s',
      zIndex: '10'
    }}>
      
      <Button sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '.4rem',
        color: '#fff',
        borderRadius: '0',
        borderBottom: '1px solid rgba(255,255,255, 0.3)',
        marginBottom: '.5rem'
      }}>Profile <Icon icon={user} size={19}></Icon></Button>

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