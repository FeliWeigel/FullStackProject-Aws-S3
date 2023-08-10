import { Navigate } from "react-router-dom"

import NavBar from "../components/nav/NavBar"
import NavMenu from "../components/nav/NavMenu"
import UpdateProfileForm from "../components/user/UpdateProfileForm"

import { Box, Container, Typography } from "@mui/material"

const UpdateProfilePage = () => {
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
            top: '1.5rem',
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
            }}>Update your profile settings!</Typography>
            <UpdateProfileForm/>
          </Container>
        </Box>
      )
}

export default UpdateProfilePage