import { useState } from "react"
import { Navigate } from "react-router-dom"

import NavBar from "../components/nav/NavBar"
import NavMenu from "../components/nav/NavMenu"
import TaskListCard from "../components/cards/TaskListCard"

import { Box, Button, Container } from "@mui/material"

import Icon from "react-icons-kit"
import {plus} from 'react-icons-kit/icomoon/plus'
import {cross} from 'react-icons-kit/icomoon/cross'
import {edit} from 'react-icons-kit/fa/edit'
import {trash} from 'react-icons-kit/fa/trash'

const TasksPage = () => {
  const [removeTask, setRemoveTask] = useState(false)

  function handleRemove(){
    if(!removeTask){
      setRemoveTask(true)
      sessionStorage.setItem("removeTask", true)
    }else {
      setRemoveTask(false)
      sessionStorage.setItem("removeTask", false)
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
            <TaskListCard removeState={sessionStorage.getItem("removeTask")}/>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'.5rem'}>
                <Button variant="outlined"><Icon icon={plus}></Icon></Button>
                <Button variant="outlined"><Icon icon={edit}></Icon></Button>
                <Button onClick={handleRemove} variant="outlined"><Icon icon={trash}></Icon></Button>
                <Button variant="outlined"><Icon icon={cross}></Icon></Button>
            </Box>
          </Container>
      </Box>
  )
}

export default TasksPage