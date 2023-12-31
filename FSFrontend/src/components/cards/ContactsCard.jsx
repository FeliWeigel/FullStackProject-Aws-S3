/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { allContactsByUser } from "../../services/EntitiesService"

import "../../index.css"
import "../css/Dashboard.css"

import { Box, Card,List,ListItem,Typography } from "@mui/material"
import Icon from "react-icons-kit"
import {plusCircle} from 'react-icons-kit/fa/plusCircle'
import {mobile} from 'react-icons-kit/fa/mobile'
import RemoveItem from "../crud/RemoveItem"
import UpdateItem from "../crud/UpdateItem"

const ContactsCard = ({size}) => {
    const [contactList, setContactList] = useState([])

    useEffect(() => {
        allContactsByUser()
        .then(res => {
        setContactList(res.data)
        })
    }, [])
    
    return (
        <Card className="dashboard-card" variant="outlined" sx={{
            display: 'block',
            height: 'auto',
            maxHeight: size,
            width: '100%',
            padding: '1rem',
            borderTop: '2px solid rgb(0, 0, 200)',
            boxShadow: "0px 0px 3px 0px rgb(0, 0, 100, 0.3)",
            borderRadius: "0",
            transition: ".4s"
        }}>
            <Typography 
                typography={'p'} 
                fontSize={'1rem'} 
                color={'rgba(0,0,0,0.9)'}
                borderBottom={'1px solid rgba(0,0,0,0.3)'}>Contact Book</Typography>
            <List sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.8rem',
                marginTop: '.3rem'
            }}>
                {contactList === null || contactList === undefined || contactList.length == 0 ?  
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Typography typography={'p'} fontSize={'1.3rem'} marginBottom={'.5rem'} textAlign={'center'}>The contact book is empty, add a new contact!</Typography>
                            <Link className="add-link" to="/contacts/add"><Icon icon={plusCircle} size={30}></Icon></Link>
                        </Box>
                : contactList.map(contact => {
                    return (
                        <Box display={"flex"} alignItems={'center'} gap={'.8rem'} key={contact.id}>
                            <ListItem  sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '7px',
                                boxShadow: '0px 0px 2px 0px rgba(0,0,54, 0.5)'
                            }}>
                                <Box display={'flex'} alignItems={'center'} gap={'1rem'}>
                                    <Box sx={{
                                        background: 'rgb(0,0,54)',
                                        borderRadius: '50%',
                                        padding: '7px'
                                    }}> 
                                        <Typography textAlign={'center'} typography={'h5'} fontWeight={400} 
                                            color={'#fff'} fontSize={'1rem'}>{contact.logo.toUpperCase()}</Typography>
                                    </Box>
                                    
                                    <Typography typography={'p'}>{contact.firstname} {contact.lastname}</Typography>
                                </Box>
            
                                <Box display={'flex'} gap={'.2rem'}>
                                    <Icon icon={mobile} size={24}></Icon>
                                    <Typography fontWeight={500} typography={'p'} fontSize={'1rem'}>+54{contact.number}</Typography>
                                </Box>

                            </ListItem>
                            {
                                sessionStorage.getItem("removeContact") == "true" ? <RemoveItem model={"contact"} id={contact.id}/> : 
                                sessionStorage.getItem("updateContact") == "true" ? <UpdateItem object={"contacts"} entityId={contact.id}/> 
                                : null
                            }
                        </Box>
                       
                    )})
                }
            </List>
        
        </Card>
    )
}

export default ContactsCard