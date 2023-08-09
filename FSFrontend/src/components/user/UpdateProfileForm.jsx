import { Box, Button, TextField, Typography } from '@mui/material'
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import "../css/UserProfile.css"
import { uploadUserProfileImage } from '../../services/UserService'

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

const UpdateProfileForm = () => {
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
        
        <Box 
          component={'form'} 
          display={'flex'} 
          flexDirection={'column'} 
          alignItems={'center'} 
          width={"60%"} 
          gap={'1rem'}>

            <Box display={'flex'} justifyContent={'center'} gap={'1rem'}>
              <TextField 
                label='Firstname' 
                type='text'
                name='firstname'
                sx={{width: '40%'}}></TextField>
              <TextField 
                label='Lastname' 
                type='text'
                name='lastname'
                sx={{width: '40%'}}></TextField>
            </Box>

            <TextField 
              label='Username' 
              type='text'
              name='username'
              sx={{width: '82%'}}></TextField>
              
            <TextField 
              label='Email' 
              type='text'
              name='email'
              sx={{width: '82%'}}></TextField>

            <Button variant='contained'>Save Changes</Button>

          </Box>
    </Box>
  )
}

export default UpdateProfileForm