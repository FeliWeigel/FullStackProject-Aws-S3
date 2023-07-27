import { Navigate } from "react-router-dom"
import NavMenu from "../components/nav/NavMenu"
import NavBar from "../components/nav/NavBar"
import { Box, Container } from "@mui/material"
import TaskListCard from "../components/cards/TaskListCard"
import CalendarCard from "../components/cards/CalendarCard"
import ContactsCard from "../components/cards/ContactsCard"

const DashboardPage = () => {
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
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          width: '80%',
          height: 'auto',
          position: 'absolute',
          right: '0',
          top: '5rem'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'relative'
          }}>
            <TaskListCard/>
            <ContactsCard/>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'relative'
          }}>
            <CalendarCard/>
            <TaskListCard/>
          </Box>
        </Container>
    </Box>
  )
}

export default DashboardPage