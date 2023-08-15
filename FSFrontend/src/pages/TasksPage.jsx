import { useState } from "react"
import { Link, Navigate } from "react-router-dom"

import NavBar from "../components/nav/NavBar"
import NavMenu from "../components/nav/NavMenu"
import TaskListCard from "../components/cards/TaskListCard"

import { Box, Button, Container, Typography } from "@mui/material"

import Icon from "react-icons-kit"
import {plus} from 'react-icons-kit/icomoon/plus'
import {cross} from 'react-icons-kit/icomoon/cross'
import {edit} from 'react-icons-kit/fa/edit'
import {trash} from 'react-icons-kit/fa/trash'
import {clipboard} from 'react-icons-kit/icomoon/clipboard'
import { deleteAllTasks } from "../services/EntitiesService"

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

  function handleRemoveAll(){
    deleteAllTasks()
    .then(() => {
      location.reload()
    })
    .catch(err => {
        console.log(err)
    })  
    setRemoveAll(false)
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
          {removeAll ? 
              <Box width={'100%'} position={"relative"} height={'100vh'} sx={{
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
                    <Button onClick={handleRemoveAllState} variant="outlined">No</Button>
                  </Box>
                </Box>
              </Box> 
              : null}
      </Box>
  )
}

export default TasksPage