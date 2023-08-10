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
        {sessionStorage.removeItem("completeTask")}
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
            gap: '1rem',
            position: 'relative'
          }}>
            <Link to="/task_list">
              <TaskListCard/>
            </Link>

            <Link to="/contacts">
              <ContactsCard/>
            </Link>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'relative'
          }}>
            <Link to="/calendar">
              <CalendarCard/>
            </Link>

            <Link to="/notes"> 
              <NotesCard/>
            </Link>
          </Box>

        </Container>
    </Box>
  )
}

export default DashboardPage