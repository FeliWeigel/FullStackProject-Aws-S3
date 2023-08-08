import { Box, Button, FormLabel, TextField } from "@mui/material"
import React from "react"
import { addEntity } from "../../services/EntitiesService"

export default class AddTaskForm extends React.Component  {
    state = {
        task: {
            name: "",
            expirationDate: ""
        }
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
        addEntity("tasks", this.state.task)
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
                    <Button type="submit" variant="contained" 
                        sx={{width: '50%', margin: '0 auto'}} onClick={this.handleAddTask}>Save task</Button>
                </Box>
            )
    }
}