import { Box, Button, TextField } from "@mui/material"
import React from "react"
import { addEntity } from "../../services/EntitiesService"

export default class AddContactForm extends React.Component  {
    state = {
        contact: {
            firstname: "",
            lastname: "",
            number: 0
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    handleChange = async (e) => {
        await this.setState({
            contact: {
                ...this.state.contact,
                [e.target.name]: e.target.value
            }
        })
    }

    handleAddContact = () => {
        addEntity("contacts", this.state.contact)
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
                    <Box display={'flex'} gap={'1rem'}>
                        <TextField
                            label="Firstname"
                            name="firstname"
                            type="text"
                            onChange={this.handleChange}>
                        </TextField>
                        <TextField
                                label="Lastname"
                                name="lastname"
                                type="text"
                                onChange={this.handleChange}> 
                        </TextField>
                    </Box>
                    <TextField
                        label="Contact number"
                        name="number"
                        type="number"
                        onChange={this.handleChange}>
                    </TextField>
                    <Button type="submit" variant="contained" 
                        sx={{width: '50%', margin: '0 auto'}} onClick={this.handleAddContact}>Save Contact</Button>
                </Box>
            )
    }
}