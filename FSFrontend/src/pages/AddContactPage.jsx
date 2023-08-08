import { Navigate } from 'react-router-dom'
import NavBar from '../components/nav/NavBar'
import NavMenu from '../components/nav/NavMenu'
import "../components/css/Dashboard.css"

import { Box, Container, Typography } from '@mui/material'
import AddContactForm from '../components/crud/AddContactForm'

const AddContactPage = () => {
  return (
    <Box sx={{
        maxWidth: '1340px',
        margin: '0',
        padding: '0'
      }}>
          {sessionStorage.getItem("isLogged") == 'true' ? null : <Navigate to="/auth/login"/>}
          <NavBar/>
          <NavMenu/>
          <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            width: '80%',
            height: '82vh',
            position: 'absolute',
            right: '0',
            top: '4.7rem'
          }}>
            <Typography className='section-title' typography={'h3'} fontSize={'1.65rem'} 
              position={'absolute'} top={'.5rem'} left={'2rem'}>Add a new contact to your phonebook!</Typography>

            <AddContactForm/>
          </Container>
      </Box>
  )
}

export default AddContactPage