import React, { useCallback } from 'react'
import { Navigate } from 'react-router-dom'

import {useDropzone} from 'react-dropzone'
import "../css/UserProfile.css"

import LoadingSp from '../loading/LoadingSp'

import { getUserProfileImageUrl, updateUserProfile, uploadUserProfileImage , getUserDetails, userLogout} from '../../services/UserService'

import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import Icon from 'react-icons-kit'
import {pencil} from 'react-icons-kit/icomoon/pencil'
import {iosContact} from 'react-icons-kit/ionicons/iosContact'


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
    userDetails: [],
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
      userLogout()
    })
    .catch(err => {
      this.setState({
        isLoading: false,
        error: true,
        message: err.response.data.message
      })
    })
  }

  
  componentDidMount(){
    getUserDetails()
    .then(res => {
      this.setState({
        userDetails: res.data
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
        
        {sessionStorage.getItem("isLogged") == 'true' ? null : <Navigate to="/auth/login"/>}
          <Typography typography={'h5'} fontSize={'1.2rem'} color={'rgba(0,0,0,0.85)'} marginBottom={'.5rem'}>Change profile image</Typography>
         
            {this.state.userDetails != null ? 
              
              <Box position={'relative'} textAlign={'center'}>
                {this.state.userDetails.profileImageId != null ? <img className='update-profile-img' src={getUserProfileImageUrl()} /> : <Box className="profile-img" sx={{
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '90%',
                  background: 'rgba(65, 65, 65, 0.936)',
                  border: 'none', 
                  margin: '0 auto', 
                  marginBottom: '1rem'
                }}>
                    <Icon className="user-default-icon" icon={iosContact} size={185}></Icon>
                </Box>}
                
            
                <Icon onClick={this.handleUpdateImageState} className='update-image-icon' icon={pencil} size={23}></Icon>
              </Box>
                
              : null
                
            } 
          
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
              </Box> 
          : null}
          
          <Box 
            component={'form'}
            onSubmit={this.handleSubmit}
            display={'flex'} 
            flexDirection={'column'} 
            alignItems={'center'} 
            width={"60%"}>

              <TextField 
                label='Username' 
                type='text'
                name='username'
                onChange={this.handleChange}
                sx={{width: '82%', marginBottom: '1rem'}}></TextField>
                
              <TextField 
                label='Email' 
                type='text'
                name='email'
                onChange={this.handleChange}
                sx={{width: '82%', marginBottom: '.2rem'}}></TextField>

              <Typography typography={'p'} color={'rgba(0,0,0,0.5)'} fontSize={'.9rem'} marginBottom={'1rem'}>(You may need to log in again)</Typography>

                {this.state.error && this.state.message != "" ? <Alert severity='warning'>{this.state.message}</Alert>
                : this.state.message == "Your profile has been successfully updated!" ? <Navigate to={"/auth/login"}/> : null}

              
              <Button onClick={this.handleUpdateProfile} type='submit' variant='contained'>
                {this.state.isLoading ? <LoadingSp size={20}/> : 'Save Changes'}
              </Button>
  
            </Box>
      </Box>
    )
  }
}