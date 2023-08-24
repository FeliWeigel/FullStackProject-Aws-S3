/* eslint-disable react/prop-types */

import { Box, Button, Typography } from "@mui/material"
import { deleteAllContacts, deleteAllNotes, deleteAllTasks } from "../../services/EntitiesService"

const RemoveAllPopUp = ({entity, buttonProps}) => {

    function handleRemoveAll(){
        if(entity === "tasks"){
            deleteAllTasks()
            .then(() => {
                location.reload()
            })
            .catch(err => {
                console.log(err)
            })  
        }else if(entity === "contacts"){   
            deleteAllContacts()
            .then(() => {
                location.reload()
            })
            .catch(err => {
                console.log(err)
            })  
        }else if(entity === "notes"){
            deleteAllNotes()
            .then(() => {
                location.reload()
            })
            .catch(err => {
                console.log(err)
            })  
        }
    }
    return (
        <>
            <Box width={'100%'} position={"relative"} height={'100vh'} maxHeight={'auto'} sx={{
                background: 'rgba(0,0,0,0.5)',
                backgroundSize: 'cover'
            }}>
                <Box position={'absolute'} top={'40%'} left={'40%'} padding={'1rem'} sx={{
                background: 'rgb(0,0,90)',
                color: '#fff'
                }}>
                <Typography typography={'p'} fontSize={'1.1rem'} textAlign={'center'} marginBottom={'.5rem'}>Are you sure you want to delete everything?</Typography>
                <Box display={'flex'} justifyContent={'center'} gap={'1rem'}>
                    <Button onClick={handleRemoveAll} variant="outlined">Yes</Button>
                    {buttonProps}
                </Box>
                </Box>
            </Box> 
        </>
    )
}

export default RemoveAllPopUp