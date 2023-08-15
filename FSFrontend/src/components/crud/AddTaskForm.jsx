import { Alert, Box, Button, FormLabel, TextField } from "@mui/material"
import React from "react"
import { addEntity } from "../../services/EntitiesService"
import LoadingSp from "../loading/LoadingSp"

export default class AddTaskForm extends React.Component  {
    state = {
        task: {
            name: "",
            expirationDate: ""
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
            task: {
                ...this.state.task,
                [e.target.name]: e.target.value
            }
        })
    }

    handleAddTask = () => {
        this.setState({
            isLoading: true
        })
        addEntity("tasks", this.state.task)
        .then(() => {
            this.setState({
                error: false,
                message: "Task added successfully!",
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
                    width: '40%',
                    padding: '2rem',
                    boxShadow: '0px 0px 4px -1px rgba(0,0,140, 0.7)'
                }}>
                    <TextField
                        label="Name"
                        name="name"
                        type="text"
                        onChange={this.handleChange}
                        ></TextField>
                    <Box display={'flex'} flexDirection={'column'}>
                        <FormLabel>Expiration Date</FormLabel>
                        <TextField
                            name="expirationDate"
                            type="date"
                            onChange={this.handleChange}></TextField>
                    </Box>
                    {
                        this.state.error && this.state.message != "" ? 
                            <Alert severity="warning">{this.state.message}</Alert> : 
                        !this.state.error && this.state.message != "" ?
                            <Alert severity="success">{this.state.message}</Alert> : null
                    }
                    <Button type="submit" variant="contained" 
                        sx={{width: '50%', margin: '0 auto'}} onClick={this.handleAddTask}>{this.state.isLoading ? <LoadingSp size={20}/> : 'Save task'}</Button>
                </Box>
            )
    }
}