
import { Alert, Box, Button, TextField } from "@mui/material"
import LoadingSp from "../loading/LoadingSp"
import { useParams } from "react-router-dom"
import { updateEntity } from "../../services/EntitiesService"
import { useState } from "react"

export default function UpdateContactForm() {
  let contactSavedId = useParams("contactId")
  const [contactFirstname, setContactFirstname] = useState("")
  const [contactLastname, setContactLastname] = useState("")
  const [contactNumber, setContactNumber] = useState(0)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleChangeFirstname(e){
    setContactFirstname(e.target.value)
  }

  async function handleChangeLastname(e){
    setContactLastname(e.target.value)
  }

  async function handleChangeNumber(e){
    setContactNumber(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
  }

  function handleUpdate(){
    setIsLoading(true)

    let contact = {
      id: contactSavedId.contactId,
      firstname: contactFirstname,
      lastname: contactLastname,
      number: contactNumber
    }

    updateEntity("contacts", contact)
    .then(() => {
      setError(false)
      setIsLoading(false)
      setMessage("Contact successfully updated!")
    })
    .catch(err => {
      setError(true)
      setIsLoading(false)
      setMessage(err.response.data.message)
    })

  }

  return (
    <Box component={'form'} onSubmit={handleSubmit} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '40%',
        padding: '2rem',
        boxShadow: '0px 0px 4px -1px rgba(0,0,140, 0.7)'
    }}>
        <Box display={'flex'} gap={'1rem'}>
          <TextField
              label="Firstname"
              name="firstname"
              type="text"
              onChange={handleChangeFirstname}></TextField>
          <TextField
              label="Lastname"
              name="lastname"
              type="text"
              onChange={handleChangeLastname}></TextField>
        </Box>
        <TextField
        label="Number"
        name="number"
        type="number"
        onChange={handleChangeNumber}
        ></TextField>
        {
            error && message != "" ? 
                <Alert severity="warning">{message}</Alert> : 
            !error && message != "" ?
                <Alert severity="success">{message}</Alert> : null
        }
        <Button type="submit" variant="contained" 
            sx={{width: '50%', margin: '0 auto'}} onClick={handleUpdate}>{isLoading ? <LoadingSp size={20}/> : 'Save changes'}</Button>
    </Box>
  )
}