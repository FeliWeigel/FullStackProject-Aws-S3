import { useState } from "react"
import { Link, Navigate } from "react-router-dom"

import NavBar from "../components/nav/NavBar"
import NavMenu from "../components/nav/NavMenu"
import TaskListCard from "../components/cards/TaskListCard"

import { Box, Button, Container } from "@mui/material"

import Icon from "react-icons-kit"
import {plus} from 'react-icons-kit/icomoon/plus'
import {cross} from 'react-icons-kit/icomoon/cross'
import {edit} from 'react-icons-kit/fa/edit'
import {trash} from 'react-icons-kit/fa/trash'
import {clipboard} from 'react-icons-kit/icomoon/clipboard'
import RemoveAllPopUp from "../components/crud/RemoveAllPopUp"

const TasksPage = () => {
  const [removeTask, setRemoveTask] = useState(false)
  const [completeTask, setCompleteTask] = useState(false)
  const [removeAll, setRemoveAll] = useState(false)
  const [updateTask, setUpdateTask] = useState(false)

  function handleRemove(){
    if(!removeTask){
      setRemoveTask(true)
      sessionStorage.setItem("removeTask", true)
      sessionStorage.setItem("completeTask", false)
      sessionStorage.setItem("updateTask", false)
    }else {
      setRemoveTask(false)
      sessionStorage.setItem("removeTask", false)
    }
  }

  function handleComplete(){
    if(!completeTask){
      setCompleteTask(true)
      sessionStorage.setItem("completeTask", true)
      sessionStorage.setItem("removeTask", false)
      sessionStorage.setItem("updateTask", false)
    }else{
      setCompleteTask(false)
      sessionStorage.setItem("completeTask", false)
    }
  }

  function handleUpdate(){
    if(!updateTask){
      setUpdateTask(true)
      sessionStorage.setItem("updateTask", true)
      sessionStorage.setItem("completeTask", false)
      sessionStorage.setItem("removeTask", false)
    }else {
      setUpdateTask(false)
      sessionStorage.setItem("updateTask", false)
    }
  }

  function handleRemoveAllState() {
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
            display: 'flex',
            gap: '2rem',
            width: '80%',
            height: 'auto',
            position: 'absolute',
            right: '0',
            top: '4.7rem'
          }}>
            <TaskListCard 
              size='auto'
            />
            
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'.5rem'}>
                <Link to="/task_list/add">
                  <Button title="Add Task" variant="outlined"><Icon icon={plus} size={16}></Icon></Button>
                </Link>
                <Button title="Edit Task" onClick={handleUpdate} variant={sessionStorage.getItem("updateTask") == "true" ? 'contained' : 'outlined'}>
                  <Icon icon={edit} size={18}></Icon>
                </Button>
                <Button title="Remove Task" onClick={handleRemove} variant={sessionStorage.getItem("removeTask") == "true" ? 'contained' : 'outlined'}>
                  <Icon icon={trash} size={19}></Icon>
                </Button>
                <Button title="Complete Task" onClick={handleComplete} variant={sessionStorage.getItem("completeTask") == "true" ? 'contained' : 'outlined'}>
                  <Icon icon={clipboard} size={18}></Icon>
                </Button>
                <Button title="Remove All" onClick={handleRemoveAllState}  variant="outlined">
                  <Icon icon={cross} size={15}></Icon>
                </Button>
            </Box>
          </Container>

          {removeAll ? <RemoveAllPopUp entity="tasks" buttonProps={<Button onClick={handleRemoveAllState} variant="outlined">No</Button>}/> : null}      
      </Box>
  )
}

export default TasksPage