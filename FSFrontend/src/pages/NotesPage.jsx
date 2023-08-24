import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import "../index.css"

import NavBar from "../components/nav/NavBar"
import NavMenu from "../components/nav/NavMenu"
import NotesCard from "../components/cards/NotesCard"

import { Box, Button, Container } from "@mui/material"
import Icon from "react-icons-kit"
import {plus} from 'react-icons-kit/icomoon/plus'
import {cross} from 'react-icons-kit/icomoon/cross'
import RemoveAllPopUp from "../components/crud/RemoveAllPopUp"

const NotesPage = () => {
  const [removeAll, setRemoveAll] = useState(false)

  function handleRemoveAllState(){
      if(!removeAll){
          setRemoveAll(true)
      }else{
          setRemoveAll(false)
      }
  }
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
              <Box 
                display={'flex'}
                flexDirection={'column'}
                gap={'.35rem'}
              >
                <Link to="/notes/add">
                  <Button variant="outlined" sx={{padding: '3px'}}>
                    <Icon icon={plus} size={18}></Icon>
                  </Button>
                </Link>

                
                <Button onClick={handleRemoveAllState} variant="outlined" sx={{padding: '3px'}}>
                    <Icon icon={cross} size={18}></Icon>
                </Button>
              </Box>
            </Container>

            {removeAll ? <RemoveAllPopUp entity="notes" buttonProps={<Button onClick={handleRemoveAllState} variant="outlined">No</Button>}/> : null}
        </Box>
    )
}

export default NotesPage