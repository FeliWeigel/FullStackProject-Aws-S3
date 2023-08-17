import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import "../../index.css"
import "../css/Dashboard.css"

import { allNotesByUser } from "../../services/EntitiesService"

import { Box, Button, Card, Typography } from "@mui/material"
import Icon from "react-icons-kit"
import {plusCircle} from 'react-icons-kit/fa/plusCircle'
import {threeHorizontal} from 'react-icons-kit/entypo/threeHorizontal'
import {edit} from 'react-icons-kit/fa/edit'
import {trash} from 'react-icons-kit/fa/trash'

const NotesCard = () => {
    const [userNotes, setUserNotes] = useState([])

    function handleActions(e){
        e.target.parentNode.parentNode.parentNode.childNodes[1].classList.remove('actions-hidden')
        e.target.parentNode.parentNode.parentNode.childNodes[1].classList.add('actions-display')
    }

    useEffect(() => {
        allNotesByUser()
        .then(res => {
          setUserNotes(res.data)
        })
    }, [])
    return (
        <Card className="dashboard-card" variant="outlined" sx={{
            display: 'block',
            height: 'auto',
            width: '98%',
            padding: '.8rem',
            borderTop: '2px solid rgb(230, 61, 0)',
            boxShadow: "0px 0px 3px 0px rgb(0, 0, 100, 0.3)",
            borderRadius: "0",
            transition: ".4s",
            overflow: 'hidden'
        }}>
            <Typography 
                typography={'p'} 
                fontSize={'1rem'} 
                color={'rgba(0,0,0,0.9)'}
                borderBottom={'1px solid rgba(0,0,0,0.3)'}
                marginBottom={'.7rem'}>Notes</Typography>
            <Box>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    justifyContent: 'center'
                }}>
                    {userNotes === null || userNotes === undefined || userNotes.length == 0 ? 
                        <Box display={'flex'} width={'100%'} flexDirection={'column'} alignItems={'center'}>
                            <Typography typography={'p'} fontSize={'1.3rem'} marginBottom={'.5rem'} textAlign={'center'}>There are no notes saved yet, add one!</Typography>
                            <Link className="add-link" to="/notes/add"><Icon icon={plusCircle} size={30}></Icon></Link>
                        </Box>
                    : userNotes.map(note => {
                        return (
                            <Box key={note.id} sx={{
                                width: '45%',
                                position: 'relative',
                                padding: '1.2rem 1rem',
                                boxShadow: '0px 0px 3px -1px rgba(0,0,100,0.5) ',
                                height: '230px',
                                cursor: 'pointer'
                            }}>
                                
                                <Button onClick={handleActions} sx={{
                                    position:'absolute',
                                    top: '-.3rem',
                                    right: '-.4rem',
                                    color: 'rgba(0,0,100,0.4)',
                                    transition: '.4s',
                                    ":hover": {
                                        color: 'rgb(0,0,100)',
                                        background: 'transparent'
                                    }
                                }}><Icon icon={threeHorizontal} size={22}></Icon></Button>

                                <Box className="actions-hidden">
                                        <Button sx={{
                                            display: 'flex',
                                            padding: '.35rem .5rem',
                                            justifyContent: 'flex-start',
                                            width: '90px',
                                            color: 'rgb(0,0,120)',
                                            gap: '.3rem'}}><Icon icon={edit}></Icon>Edit</Button>
                                        <Box sx={{
                                            width: '90%',
                                            margin: '0 auto',
                                            height: '.5px',
                                            background: 'rgba(0,0,150, 0.3)'
                                        }}></Box>
                                        <Button sx={{
                                            display: 'flex',
                                            padding: '.4rem .5rem',
                                            justifyContent: 'flex-start',
                                            width: '90px',
                                            color: 'rgb(0,0,120)',
                                            gap: '.3rem'}}><Icon icon={trash}></Icon>Delete</Button>
                                    </Box> 

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
                                <Typography overflow={'hidden'} width={'93%'} height={'100%'} typography={'p'} color={"rgba(0,0,0,0.7)"} fontSize={'.8rem'}>{note.text}</Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Card>
    )
}

export default NotesCard