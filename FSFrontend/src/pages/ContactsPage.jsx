import { Link, Navigate } from "react-router-dom"

import NavBar from "../components/nav/NavBar"
import NavMenu from "../components/nav/NavMenu"
import ContactsCard from "../components/cards/ContactsCard"
import RemoveAllPopUp from "../components/crud/RemoveAllPopUp"

import { Box, Button, Container } from "@mui/material"
import Icon from "react-icons-kit"
import {plus} from 'react-icons-kit/icomoon/plus'
import {cross} from 'react-icons-kit/icomoon/cross'
import {edit} from 'react-icons-kit/fa/edit'
import {trash} from 'react-icons-kit/fa/trash'
import { useState } from "react"


const ContactsPage = () => {
    const [updateContact, setUpdateContact] = useState(false)
    const  [removeContact, setRemoveContact] = useState(false)
    const [removeAll, setRemoveAll] = useState(false)

    function handleUpdate(){
        if(!updateContact){
          setUpdateContact(true)
          sessionStorage.setItem("updateContact", true)
          sessionStorage.setItem("removeContact", false)
        }else {
          setUpdateContact(false)
          sessionStorage.setItem("updateContact", false)
        }
    }

    function handleRemove(){
        if(!removeContact){
            setRemoveContact(true)
            sessionStorage.setItem("removeContact", true)
            sessionStorage.setItem("updateContact", false)
        }else {
            setRemoveContact(false)
            sessionStorage.setItem("removeContact", false)
        }
    }

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
                    <Button title="Edit Contact" onClick={handleUpdate} variant={sessionStorage.getItem("updateContact") == "true" ? 'contained' : 'outlined'}><Icon icon={edit} size={18}></Icon></Button>
                    <Button title="Remove Contact" onClick={handleRemove} variant={sessionStorage.getItem("removeContact") == "true" ? 'contained' : 'outlined'}><Icon icon={trash} size={19}></Icon></Button>
                    <Button title="Remove All" onClick={handleRemoveAllState} variant="outlined"><Icon icon={cross} size={15}></Icon></Button>
                </Box>
                <ContactsCard size="auto"/>
            </Container>

            {removeAll ? <RemoveAllPopUp entity="contacts" buttonProps={<Button onClick={handleRemoveAllState} variant="outlined">No</Button>}/> : null}      
        </Box>
    )
}

export default ContactsPage