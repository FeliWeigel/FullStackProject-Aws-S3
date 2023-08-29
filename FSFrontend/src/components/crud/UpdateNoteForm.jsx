import { Alert, Box, Button, Input } from "@mui/material"
import LoadingSp from "../loading/LoadingSp"
import { Navigate, useParams } from "react-router-dom"
import { getNoteByUser, updateEntity } from "../../services/EntitiesService"
import { useEffect, useState } from "react"

export default function UpdateNoteForm() {
  let noteSavedId = useParams("noteId")
  const [noteSaved, setNoteSaved] = useState([])
  const [noteTitle, setNoteTitle] = useState("")
  const [noteText, setNoteText] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleChangeTitle(e){
    await setNoteTitle(e.target.value)
  }

  async function handleChangeText(e){ 
    await setNoteText(e.target.value)
  }

  useEffect(() => {
    if(noteSaved.title != null){
      setNoteTitle(noteSaved.title)
    }

    
    if(noteSaved.text != null){
      setNoteText(noteSaved.text)
    }

    getNoteByUser(noteSavedId.noteId)
    .then(res => {
      setNoteSaved(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  function handleSubmit(e){
    e.preventDefault()
  }

  function handleUpdate(){
    setIsLoading(true)

    let note = {
      id: noteSavedId.noteId,
      title: noteTitle,
      text: noteText
    }

    updateEntity("notes", note)
    .then(() => {
      setError(false)
      setIsLoading(false)
      setSuccess(true)
    })
    .catch(err => {
      setError(true)
      setIsLoading(false)
      setMessage(err.response.data.message)
      setSuccess(false)
    })

  }

  return (
    <Box component={'form'} onSubmit={handleSubmit} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        height: '100%',
        padding: '2rem',
        boxShadow: '0px 0px 4px -1px rgba(0,0,140, 0.7)'
    }}>
        <Input
            id="note-title-input"
            className="title-input-note"
            defaultValue={noteSaved != null ? noteSaved.title : "Title"}
            name="title"
            type="text"
            onChange={handleChangeTitle} sx={{fontSize: '1.5rem', fontWeight: '500'}}>
        </Input>
        <Box id="note-textarea"
            defaultValue={noteSaved != null ? noteSaved.text : "Text"} component={'textarea'} className="notes-textarea"
            name="text" width={"100%"} height={"70%"}
            padding={'.5rem'} fontFamily={"'Roboto', sans-serif"} onChange={handleChangeText}></Box>
        
        {
            error && message != "" ? 
                <Alert severity="warning">{message}</Alert> : 
            !error && success ? <Navigate to="/notes"/> : null
        }
        <Button type="submit" variant="contained" 
            sx={{
                gap: '.5rem',
                width: '17%', 
                margin: '0 auto', 
                }} onClick={handleUpdate}>{isLoading ? <LoadingSp size={20}/> : 'Save Changes'}</Button>
    </Box>
)
}