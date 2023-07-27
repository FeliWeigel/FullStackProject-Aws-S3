import "../../index.css"
import "../css/Dashboard.css"

import { Card, Typography } from "@mui/material"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { LocalizationProvider } from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"

const CalendarCard = () => {
    return (
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Card className="dashboard-card" variant="outlined" sx={{
                width: '100%',
                height: 'auto',
                padding: '1rem',
                borderTop: '2px solid rgb(230,0,0)',
                boxShadow: "0px 0px 3px 0px rgb(0, 0, 100, 0.3)",
                borderRadius: "0",
                transition: ".4s"
            }}>
                <Typography 
                    typography={'p'} 
                    fontSize={'1rem'} 
                    color={'rgba(0,0,0,0.9)'}
                    borderBottom={'1px solid rgba(0,0,0,0.3)'}
                    marginBottom={'.8rem'}>Date Calendar</Typography>
                
                <DateCalendar sx={{
                    width: '85%',
                    boxShadow: '0px 0px 1px 0px rgba(0,0,80,0.5)'
                }}/>
            </Card>
        </LocalizationProvider>
        
      )
}

export default CalendarCard