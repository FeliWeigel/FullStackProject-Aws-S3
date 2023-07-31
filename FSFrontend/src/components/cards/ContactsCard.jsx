import "../../index.css"
import "../css/Dashboard.css"

import Icon from "react-icons-kit"
import { Box, Card,List,ListItem,Typography } from "@mui/material"
import {mobile} from 'react-icons-kit/fa/mobile'
import { allContactsByUser } from "../../services/EntitiesService"
import { useState } from "react"

const ContactsCard = () => {
    allContactsByUser()
    const [contactList] = useState(JSON.parse(localStorage.getItem("contactList")))
    
    return (
        <Card className="dashboard-card" variant="outlined" sx={{
            display: 'block',
            height: 'auto',
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
                gap: '.7rem',
                marginTop: '.3rem'
            }}>
                {contactList != null ? contactList.map(contact => {
                    return (
                        <ListItem key={contact.id} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '7px',
                            boxShadow: '0px 0px 2px 0px rgba(0,0,54, 0.5)'
                        }}>
                            <Box display={'flex'} alignItems={'center'} gap={'1rem'}>
                                <Box sx={{
                                    background: 'rgb(0,0,54)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: '50%'
                                }}> 
                                    <Typography typography={'h5'} padding={'6px'} fontWeight={400} 
                                        color={'#fff'} fontSize={'1rem'}>FW</Typography>
                                </Box>
                                
                                <Typography typography={'p'}>{contact.name}</Typography>
                            </Box>
        
                            <Box display={'flex'} gap={'.2rem'}>
                                <Icon icon={mobile} size={24}></Icon>
                                <Typography fontWeight={500} typography={'p'} fontSize={'1rem'}>+54{contact.number}</Typography>
                            </Box>
                        </ListItem>
                    )
                }) : null}
            </List>
        
        </Card>
    )
}

export default ContactsCard