
import { Alert, Box, Button, FormLabel, TextField } from "@mui/material"
import LoadingSp from "../loading/LoadingSp"
import { useParams } from "react-router-dom"
import { updateEntity } from "../../services/EntitiesService"
import { useState } from "react"

export default function UpdateTaskForm() {
  let taskSavedId = useParams("taskId")
  const [taskName, setTaskName] = useState("")
  const [taskDate, setTaskDate] = useState("")
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleChangeName(e){
    setTaskName(e.target.value)
  }

  async function handleChangeDate(e){
    setTaskDate(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
  }

  function handleUpdate(){
    setIsLoading(true)

    let task = {
      id: taskSavedId.taskId,
      name: taskName,
      expirationDate: taskDate
    }

    updateEntity("tasks", task)
    .then(() => {
      setError(false)
      setIsLoading(false)
      setMessage("Task successfully updated!")
    })
    .catch(err => {
      setError(true)
      setIsLoading(false)
      setMessage(err.response.data.message)
      console.log(err)
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
        <TextField
            label="Name"
            name="name"
            type="text"
            onChange={handleChangeName}
            ></TextField>
        <Box display={'flex'} flexDirection={'column'}>
            <FormLabel>Expiration Date</FormLabel>
            <TextField
                name="expirationDate"
                type="date"
                onChange={handleChangeDate}></TextField>
        </Box>
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

