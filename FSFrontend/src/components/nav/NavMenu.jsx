import "../../index.css"
import "./Nav.css"

import { List, ListItem, Typography } from "@mui/material"
import Icon from "react-icons-kit"
import {notepad_ok} from 'react-icons-kit/ikons/notepad_ok'
import {calendar} from 'react-icons-kit/ikons/calendar'
import {addressBook} from 'react-icons-kit/icomoon/addressBook'
import {bar_graph} from 'react-icons-kit/ikons/bar_graph'
import {pen_3} from 'react-icons-kit/ikons/pen_3'
import { Link } from "react-router-dom"

const NavMenu = () => {
  
  
  return (
    <nav className="nav">

      <Typography
        typography={'h3'} 
        fontSize={'1.5rem'} 
        fontStyle={'italic'} 
        fontWeight={'700'}
        padding={'0 2.5rem'}
        marginBottom={'.4rem'}
        color={'#fff'}>Dashboard</Typography>
      <List sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Link to="/">
          <ListItem component="button" sx={{padding: '1.25rem 0'}}  className="nav-link">
            <Icon icon={bar_graph} size={19}></Icon>Dashboard
          </ListItem>
        </Link>
        <Link to="/task_list">
          <ListItem component="button" sx={{padding: '1.25rem 0'}}  className="nav-link">
            <Icon icon={notepad_ok} size={19}></Icon>Task List
          </ListItem>
        </Link>
        <Link to="/calendar">
          <ListItem component="button" sx={{padding: '1.25rem 0'}}  className="nav-link">
            <Icon icon={calendar} size={19}></Icon>Calendar
          </ListItem>
        </Link>
        <Link to="/contacts">
          <ListItem component="button" sx={{padding: '1.25rem 0'}}  className="nav-link">
            <Icon icon={addressBook} size={19}></Icon>Contacts
          </ListItem>
        </Link>
        <Link to="/notes">
          <ListItem component="button" sx={{padding: '1.25rem 0'}}  className="nav-link">
            <Icon icon={pen_3} size={19}></Icon>Notes
          </ListItem>
        </Link>
      </List>
    </nav>
  )
}

export default NavMenu