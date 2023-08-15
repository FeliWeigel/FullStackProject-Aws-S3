import React from "react"

import "../css/Notes.css"
import { addEntity } from "../../services/EntitiesService"

import { Alert, Box, Button, Input } from "@mui/material"
import LoadingSp from "../loading/LoadingSp"

export default class AddNoteForm extends React.Component  {
    state = {
        note: {
            title: "",
            text: ""
        },
        error: false,
        message: "",
        isLoading: false
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
        this.setState({
            isLoading: true
        })
        addEntity("notes", this.state.note)
        .then(() => {
            this.setState({
                error: false,
                message: "Note added successfully!",
                isLoading: false
            })
        })
        .catch(err => {
            this.setState({
                error: true,
                message: err.response.data.message,
                isLoading: false
            })
        })
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

                    {
                        this.state.error && this.state.message != "" ? 
                            <Alert severity="warning">{this.state.message}</Alert> : 
                        !this.state.error && this.state.message != "" ?
                            <Alert severity="success">{this.state.message}</Alert> : null
                    }
                    <Button type="submit" variant="contained" 
                        sx={{
                            gap: '.5rem',
                            width: '15%', 
                            margin: '0 auto', 
                            }} onClick={this.handleAddNote}>{this.state.isLoading ? <LoadingSp size={20}/> : 'Save'}</Button>
                </Box>
            )
    }
}