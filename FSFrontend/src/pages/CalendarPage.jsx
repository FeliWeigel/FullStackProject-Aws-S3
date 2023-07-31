import NavBar from '../components/nav/NavBar'
import NavMenu from '../components/nav/NavMenu'
import { Box, Container, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const CalendarPage = () => {
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
              width: '80%',
              height: '95vh',
              position: 'absolute',
              right: '0',
              top: '4.7rem'
            }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Typography
                        typography={'p'} 
                        fontSize={'1.5rem'} 
                        color={'rgba(0,0,0,0.9)'}
                        borderBottom={'1px solid rgba(0,0,0,0.3)'}
                        marginBottom={'.8rem'}>Date Calendar</Typography>
                    
                    <DateCalendar sx={{
                        width: '100%',
                        height: '100%',
                        boxShadow: '0px 0px 1px 0px rgba(0,0,80,0.5)'
                    }}/>
                </LocalizationProvider>
            </Container>
        </Box>
    )
}

export default CalendarPage