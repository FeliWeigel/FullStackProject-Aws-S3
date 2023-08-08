import { Navigate } from "react-router-dom"

import NavBar from "../components/nav/NavBar"
import NavMenu from "../components/nav/NavMenu"

import { Box, Container } from "@mui/material"
import NotesCard from "../components/cards/NotesCard"

const NotesPage = () => {
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
              gap: '2rem',
              width: '80%',
              height: 'auto',
              position: 'absolute',
              right: '0',
              top: '4.7rem'
            }}>
              <NotesCard/>
            </Container>
        </Box>
    )
}

export default NotesPage