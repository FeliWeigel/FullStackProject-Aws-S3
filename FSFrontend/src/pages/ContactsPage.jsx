import { Link, Navigate } from "react-router-dom"

import NavBar from "../components/nav/NavBar"
import NavMenu from "../components/nav/NavMenu"
import ContactsCard from "../components/cards/ContactsCard"

import { Box, Button, Container } from "@mui/material"
import Icon from "react-icons-kit"
import {plus} from 'react-icons-kit/icomoon/plus'
import {cross} from 'react-icons-kit/icomoon/cross'
import {edit} from 'react-icons-kit/fa/edit'
import {trash} from 'react-icons-kit/fa/trash'
import { useState } from "react"


const ContactsPage = () => {
    const  [removeContact, setRemoveContact] = useState(false)
    function handleRemove(){
        if(!removeContact){
            setRemoveContact(true)
            sessionStorage.setItem("removeContact", true)
        }else {
            setRemoveContact(false)
            sessionStorage.setItem("removeContact", false)
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
              gap: '2rem',
              width: '80%',
              height: 'auto',
              position: 'absolute',
              right: '0',
              top: '4.2rem'
            }}>
                <Box 
                    display={'flex'} 
                    alignItems={'center'} 
                    gap={'.5rem'} 
                    height={'3.5rem'}
                    marginBottom={'.8rem'} 
                    padding={'.7rem'}
                    borderRadius={'7px'}
                    sx={{background: 'rgba(0,0,90)'}}>
                    <Link to="/contacts/add">
                        <Button title="New contact" variant="outlined"><Icon icon={plus} size={16}></Icon></Button>
                    </Link>
                    <Button title="Edit Contact" variant="outlined"><Icon icon={edit} size={18}></Icon></Button>
                    <Button title="Remove Contact" onClick={handleRemove} variant={sessionStorage.getItem("removeContact") == "true" ? 'contained' : 'outlined'}><Icon icon={trash} size={19}></Icon></Button>
                    <Button title="Remove All" variant="outlined"><Icon icon={cross} size={15}></Icon></Button>
                </Box>
                <ContactsCard/>
            </Container>
        </Box>
    )
}

export default ContactsPage