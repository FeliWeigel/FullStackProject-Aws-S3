import React, { useCallback } from 'react'
import {useDropzone} from 'react-dropzone'

import "../css/UserProfile.css"

import { getUserProfileImageUrl, updateUserProfile, uploadUserProfileImage } from '../../services/UserService'

import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import Icon from 'react-icons-kit'
import {pencil} from 'react-icons-kit/icomoon/pencil'
import LoadingSp from '../loading/LoadingSp'
import { Navigate } from 'react-router-dom'

const Dropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0])

    uploadUserProfileImage(formData).catch(err => {console.log(err)})
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the picture here ...</p> :
          <p>Drag and drop picture here, or click to select picture</p>
      }
    </div>
  )
}

export default class UpdateProfileForm extends React.Component {
  state = {
    user: {
      username: "",
      email: ""
    },
    error: false,
    message: "",
    isLoading: false,
    updateImage: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }
  
  handleChange = async e => {
    await this.setState({
      user: { 
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }

  handleUpdateImageState = () => {
    if(!this.state.updateImage){
      this.setState({
        updateImage: true
      })
    }else{
      this.setState({
        updateImage: false
      })
    }
  }

  handleUpdateProfile = () => {

    this.setState({
      isLoading: true
    })

    updateUserProfile(this.state.user)
    .then(() => {
      this.setState({
        isLoading: false,
        error: false,
        message: "Your profile has been successfully updated!"
      })
    })
    .catch(err => {
      this.setState({
        isLoading: false,
        error: true,
        message: err.response.data.message
      })
    })
  }

  render(){
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 0px 3px 0px rgba(0,0,100,0.7)',
        paddingTop: '1rem',
        paddingBottom: '2rem',
        width: '85%'
      }}>
          <Typography typography={'h5'} fontSize={'1.2rem'} color={'rgba(0,0,0,0.85)'} marginBottom={'.5rem'}>Change profile image</Typography>
          <Box position={'relative'} textAlign={'center'}>
            <img className='update-profile-img' src={getUserProfileImageUrl()} alt="" />
            <Icon onClick={this.handleUpdateImageState} className='update-image-icon' icon={pencil} size={23}></Icon>
          </Box>
          {this.state.updateImage ? 
            <Box sx={{
              width: '60%',
              textAlign: 'center',
              padding: '1.6rem 2rem',
              marginBottom: '1rem',
              fontSize: '1.2rem',
              border: '2px dashed rgba(0,0,90,0.8)',
              cursor: 'pointer'
            }}>
              <Dropzone/>
            </Box> : null}
          
          <Box 
            component={'form'}
            onSubmit={this.handleSubmit}
            display={'flex'} 
            flexDirection={'column'} 
            alignItems={'center'} 
            width={"60%"} 
            gap={'1rem'}>
  
              <TextField 
                label='Username' 
                type='text'
                name='username'
                onChange={this.handleChange}
                sx={{width: '82%'}}></TextField>
                
              <TextField 
                label='Email' 
                type='text'
                name='email'
                onChange={this.handleChange}
                sx={{width: '82%'}}></TextField>

                {this.state.error && this.state.message != "" ? <Alert severity='warning'>{this.state.message}</Alert> : null}
                {!this.state.error && this.state.message == "Your profile has been successfully updated!" ? <Navigate to={"/auth/login"}/> : null}
              <Button onClick={this.handleUpdateProfile} type='submit' variant='contained'>
                {this.state.isLoading ? <LoadingSp size={20}/> : 'Save Changes'}
              </Button>
  
            </Box>
      </Box>
    )
  }
}