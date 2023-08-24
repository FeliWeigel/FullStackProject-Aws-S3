import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"

import "../index.css"
import { countEntity } from "../services/EntitiesService"
import "../components/css/UserProfile.css"
import NavBar from "../components/nav/NavBar"
import NavMenu from "../components/nav/NavMenu"
import { getUserDetails, getUserProfileImageUrl } from "../services/UserService"


import { Box, Button, Container, Typography } from "@mui/material"
import Icon from "react-icons-kit"
import {pencil2} from 'react-icons-kit/icomoon/pencil2'
import {notepad_ok} from 'react-icons-kit/ikons/notepad_ok'
import {addressBook} from 'react-icons-kit/icomoon/addressBook'
import {pen_3} from 'react-icons-kit/ikons/pen_3'
import {iosContact} from 'react-icons-kit/ionicons/iosContact'


const UserProfilePage = () => {
    const [userDetails, setUserDetails] = useState([])
    const [tasksCount, setTasksCount] = useState(0)
    const [contactsCount, setContactsCount] = useState(0)
    const [notesCount, setNotesCount] = useState(0)

    useEffect(() => {
      getUserDetails()
      .then(res => {
        setUserDetails(res.data)
      })

      countEntity("tasks")
      .then(res => {
        setTasksCount(res.data)
      })

      countEntity("contacts")
      .then(res => {
        setContactsCount(res.data)
      })

      countEntity("notes")
      .then(res => {
        setNotesCount(res.data)
      })
    }, [])

    return (
        <Box sx={{
          maxWidth: '1340px',
          margin: '0',
          padding: '0'
        }}>
            {sessionStorage.getItem("isLogged") == 'true' ? null : <Navigate to="/auth/login"/>}
            {sessionStorage.removeItem("removeTask")}
            {sessionStorage.removeItem("completeTask")}
            <NavBar/>
            <NavMenu/>
          <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems:'center',
            width: '80%',
            height: 'auto',
            position: 'absolute',
            right: '0',
            top: '1.2rem',
            padding: '3rem 0'
          }}>
            <Typography typography={'h3'} alignSelf={'flex-start'}
            fontSize={'1.6rem'} marginBottom={'1rem'} position={'relative'} 
            sx={{
              ":before":{
                content: "''",
                position: 'absolute',
                bottom: '-.2rem',
                width: '27px',
                height: '1.5px',
                background: 'rgb(0,0,100)'
              }
            }}>Your profile</Typography>
            {userDetails != null ? 
              <Box width={'95%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>    

                <Box width={'100%'} borderBottom={"1px solid rgba(0,0,150,0.4)"} textAlign={'center'}>     
                  {
                    userDetails.profileImageId != null ? <img className='profile-img' src={getUserProfileImageUrl()} alt=""/> 
                      : 
                    <Box className="profile-img" sx={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: '20%',
                      background: 'rgba(65, 65, 65, 0.936)',
                      border: 'none', 
                      margin: '0 auto', 
                      marginBottom: '1rem'
                    }}>
                      <Icon className="user-default-icon" icon={iosContact} size={185}></Icon>
                    </Box>
                  }
                </Box>

                <Box width={'100%'} padding={'1rem 1.4rem'} display={'flex'} justifyContent={'space-between'}>
                  <Box display={'flex'} gap={'2rem'}>
                    <Box padding={'1rem 1.8rem'} boxShadow={'0px 0px 2px 0px rgba(0,0,90,0.7)'}>
                      <Typography typography={'p'} fontSize={'1.2rem'} color={'rgba(0,0,0,.7)'} marginBottom={'.4rem'}>
                        <strong>Username:</strong> {userDetails.username}
                      </Typography>

                      <Typography typography={'p'} fontSize={'1.2rem'} color={'rgba(0,0,0,.7)'} marginBottom={'.4rem'}>
                        <strong>Firstname:</strong> {userDetails.firstname}
                      </Typography>
                    
                      <Typography typography={'p'} fontSize={'1.2rem'} color={'rgba(0,0,0,.7)'} marginBottom={'.4rem'}>
                        <strong>Lastname:</strong> {userDetails.lastname}
                      </Typography>
                      
                      <Typography typography={'p'} fontSize={'1.2rem'} color={'rgba(0,0,0,.7)'} marginBottom={'.4rem'}>
                        <strong>Email:</strong> {userDetails.email}
                      </Typography>
                    </Box>

                    <Box>
                      <Box display={'flex'} borderBottom={'.5px solid rgba(0,0, 90, 0.4)'} marginBottom={'1rem'} gap={'.4rem'}>
                        <Icon icon={notepad_ok} className="stats-list-icon" size={20}></Icon>
                        <Typography typography={'p'} fontSize={'1.2rem'} marginBottom={'.4rem'}>
                          <strong>Tasks:</strong> {tasksCount}
                        </Typography>
                      </Box>

                      <Box display={'flex'} borderBottom={'.5px solid rgba(0,0, 90, 0.4)'} marginBottom={'1rem'}  gap={'.4rem'}>
                        <Icon icon={addressBook} className="stats-list-icon" size={20}></Icon>
                        <Typography typography={'p'} fontSize={'1.2rem'} marginBottom={'.4rem'}>
                          <strong>Contacts:</strong> {contactsCount}
                        </Typography>
                      </Box>

                      <Box display={'flex'} borderBottom={'.5px solid rgba(0,0, 90, 0.4)'} marginBottom={'1rem'}  gap={'.4rem'}>
                        <Icon icon={pen_3} className="stats-list-icon" size={20}></Icon>
                        <Typography typography={'p'} fontSize={'1.2rem'} marginBottom={'.4rem'}>
                          <strong>Notes: </strong> {notesCount}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Link to="/user/profile/update">
                    <Button variant="outlined" sx={{
                      height: '2.6rem',
                      display: "flex",
                      gap: '.4rem',
                      color: 'rgba(0,0,160, 0.9)',
                      border: '.5px solid rgba(0,0,120, .5)',
                      transition: ".4s",
                      ":hover": {
                        background: 'rgb(0,0,90)',
                        color: '#fff'
                      }
                    }}>Edit Profile <Icon icon={pencil2} size={17}></Icon></Button>
                  </Link>
                </Box>
              </Box>
            : null}
          </Container>
        </Box>
      )
}

export default UserProfilePage