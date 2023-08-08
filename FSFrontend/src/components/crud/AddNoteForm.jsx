import { Box, Button, Input } from "@mui/material"
import React from "react"
import { addEntity } from "../../services/EntitiesService"
import "../css/Notes.css"
import {pencil2} from 'react-icons-kit/icomoon/pencil2'
import Icon from "react-icons-kit"

export default class AddNoteForm extends React.Component  {
    state = {
        note: {
            title: "",
            text: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    handleChange = async (e) => {
        await this.setState({
            note: {
                ...this.state.note,
                [e.target.name]: e.target.value
            }
        })
    }

    handleAddNote = () => {
        addEntity("notes", this.state.note)
    }

    render(){
            return (
                <Box component={'form'} onSubmit={this.handleSubmit} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '100%',
                    height: '100%',
                    padding: '2rem',
                    boxShadow: '0px 0px 4px -1px rgba(0,0,140, 0.7)'
                }}>
                    <Input
                        className="title-input-note"
                        placeholder="Title"
                        name="title"
                        type="text"
                        onChange={this.handleChange}>
                    </Input>
                    <Box component={'textarea'} className="notes-textarea"
                        name="text" width={"100%"} height={"70%"}
                        padding={'.5rem'} fontFamily={"'Roboto', sans-serif"} onChange={this.handleChange}></Box>
                    <Button type="submit" variant="contained" 
                        sx={{
                            gap: '.5rem',
                            width: '15%', 
                            margin: '0 auto', 
                            }} onClick={this.handleAddNote}>Save<Icon icon={pencil2} size={16}></Icon></Button>
                </Box>
            )
    }
}