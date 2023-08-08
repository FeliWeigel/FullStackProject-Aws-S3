import { useState } from "react"
import { Link } from "react-router-dom"

import "../../index.css"
import "../css/Dashboard.css"

import { allNotesByUser } from "../../services/EntitiesService"

import { Box, Card, Typography } from "@mui/material"
import Icon from "react-icons-kit"
import {plusCircle} from 'react-icons-kit/fa/plusCircle'

const NotesCard = () => {
    allNotesByUser()
    const [userNotes] = useState(JSON.parse(localStorage.getItem("noteList")))

    return (
        <Card className="dashboard-card" variant="outlined" sx={{
            display: 'block',
            height: 'auto',
            width: '98%',
            padding: '.8rem',
            borderTop: '2px solid rgb(230, 61, 0)',
            boxShadow: "0px 0px 3px 0px rgb(0, 0, 100, 0.3)",
            borderRadius: "0",
            transition: ".4s"
        }}>
            <Typography 
                typography={'p'} 
                fontSize={'1rem'} 
                color={'rgba(0,0,0,0.9)'}
                borderBottom={'1px solid rgba(0,0,0,0.3)'}
                marginBottom={'.7rem'}>Notes</Typography>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                {userNotes === null || userNotes.length === 0 ? 
                    <Box display={'flex'} width={'100%'} flexDirection={'column'} alignItems={'center'}>
                        <Typography typography={'p'} fontSize={'1.3rem'} marginBottom={'.5rem'} textAlign={'center'}>There are no notes saved yet, add one!</Typography>
                        <Link className="add-link" to="/notes/add"><Icon icon={plusCircle} size={30}></Icon></Link>
                    </Box>
                : userNotes.map(note => {
                    return (
                        <Box key={note.id} sx={{
                            width: '45%',
                            padding: '1rem',
                            boxShadow: '0px 0px 3px -1px rgba(0,0,100,0.5) ',
                            height: '230px',
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }}>
                            <Typography typography={'h5'} position={'relative'} fontSize={'1rem'} marginBottom={'.3rem'} sx={{
                                "::before": {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '0',
                                    width: "100%",
                                    height: '.5px',
                                    background: 'rgba(0,0,80, 0.5)'
                                }
                            }}>{note.title}</Typography>
                            <Typography typography={'p'} color={"rgba(0,0,0,0.7)"} fontSize={'.8rem'}>{note.text}</Typography>
                        </Box>
                    )
                })}
            </Box>
        </Card>
    )
}

export default NotesCard