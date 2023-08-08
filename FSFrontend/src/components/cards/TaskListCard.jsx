import { Link } from "react-router-dom"

import "../../index.css"
import "../css/Dashboard.css"
import "../css/TaskList.css"

import { useState } from "react"
import { allTaskByUser } from "../../services/EntitiesService"
import RemoveItem from "../crud/RemoveItem"
import CompleteTask from "../crud/CompleteTask"

import { Box, Card, List, ListItem, Typography } from "@mui/material"
import Icon from "react-icons-kit"
import {cross} from 'react-icons-kit/icomoon/cross'
import {checkmark} from 'react-icons-kit/icomoon/checkmark'
import {plusCircle} from 'react-icons-kit/fa/plusCircle'


const TaskListCard = () => {
  allTaskByUser()
  const [taskList] = useState(JSON.parse(localStorage.getItem("taskList")))

  return (
    <Card className="dashboard-card" variant="outlined" sx={{
        display: 'block',
        height: 'auto',
        width: '100%',
        padding: '1rem 1.2rem .7rem 1.2rem',
        borderTop: '2px solid rgb(0,140,0)',
        boxShadow: "0px 0px 3px 0px rgb(0, 0, 100, 0.3)",
        borderRadius: "0",
        transition: ".4s"
    }}>
        <Typography 
            typography={'p'} 
            fontSize={'1rem'} 
            color={'rgba(0,0,0,0.9)'}
            borderBottom={'1px solid rgba(0,0,0,0.3)'}>Task List</Typography>
        <List>
            {taskList === null  || taskList.length === 0 ? 
                  <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography typography={'p'} fontSize={'1.3rem'} marginBottom={'.5rem'} textAlign={'center'}>The task list is empty, add a new task!</Typography>
                    <Link className="add-link" to="/task_list/add"><Icon icon={plusCircle} size={30}></Icon></Link>
                  </Box>
            : taskList.map(task => {
              return (
                <ListItem key={task.id} sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(0,0,150, 0.3)',
                  marginBottom: '.3rem'
                }}>
                  <Box>
                    <Typography typography={'h5'} fontWeight={500} fontSize={'.95rem'}>
                        {task.name}
                    </Typography>
                    
                    <Typography typography={'p'} fontSize={".75rem"} color={'rgba(0,0,0,0.5)'}>
                          (Time until: <strong>{task.expirationDate}</strong>)
                    </Typography>
                  </Box>
                  
                  <Box display={'flex'} gap={'.7rem'}>
                    {task.isCompleted  ? <Icon className="iscomplete-icon" icon={checkmark} size={17}></Icon> :  !task.isCompleted ? <Icon className="iscomplete-icon" icon={cross} size={15}></Icon> : null} 
                    {sessionStorage.getItem("removeTask") == "true" ? <RemoveItem model={"task"} id={task.id}/> : sessionStorage.getItem("completeTask") == "true" ? <CompleteTask task={task}/> : null}
                  </Box>
               </ListItem>
              )
              
            })}
        </List>
    </Card>
  )
}

export default TaskListCard