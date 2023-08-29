import { Link, Navigate } from "react-router-dom"
import NavMenu from "../components/nav/NavMenu"
import NavBar from "../components/nav/NavBar"
import { Box, Container } from "@mui/material"
import TaskListCard from "../components/cards/TaskListCard"
import CalendarCard from "../components/cards/CalendarCard"
import ContactsCard from "../components/cards/ContactsCard"
import NotesCard from "../components/cards/NotesCard"

const DashboardPage = () => {
  return (
    <Box sx={{
      maxWidth: '1340px',
      margin: '0',
      padding: '0'
    }}>
        {sessionStorage.getItem("isLogged") == 'true' ? null : <Navigate to="/auth/login"/>}
        {sessionStorage.removeItem("removeTask")}
        {sessionStorage.removeItem("removeContact")}
        {sessionStorage.removeItem("completeTask")}
        {sessionStorage.removeItem("updateTask")}
        {sessionStorage.removeItem("updateContact")}
        <NavBar/>
        <NavMenu/>
        <Container sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          width: '80%',
          height: 'auto',
          position: 'absolute',
          right: '0',
          top: '1.7rem',
          padding: '3.5rem'
        }}>
          
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            gap: '1rem',
            position: 'relative'
          }}>
            <Link to="/task_list">
              <TaskListCard size="360px"/>
            </Link>

            <Link to="/contacts">
              <ContactsCard size="365px"/>
            </Link>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '450px',
            gap: '1rem',
            position: 'relative'
          }}>
            <Link to="/calendar">
              <CalendarCard/>
            </Link>

            <Link to="/notes"> 
              <NotesCard size={'540px'}/>
            </Link>
          </Box>

        </Container>
    </Box>
  )
}

export default DashboardPage