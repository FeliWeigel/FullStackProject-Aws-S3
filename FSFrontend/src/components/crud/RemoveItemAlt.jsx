/* eslint-disable react/prop-types */

import { Button } from '@mui/material'
import Icon from 'react-icons-kit'
import {trash} from 'react-icons-kit/fa/trash'
import { deleteEntity } from '../../services/EntitiesService'

const RemoveItemAlt = ({object, id}) => {

    function remove(){
        deleteEntity(object, id)
        .then(() => {
            location.reload()
        })
    }
    
    return (
        <>
            <Button onClick={remove} sx={{
                display: 'flex',
                padding: '.4rem .5rem',
                justifyContent: 'flex-start',
                width: '90px',
                color: 'rgb(0,0,120)',
                gap: '.3rem'
            }}>
                    <Icon icon={trash} size={20}></Icon>Delete
            </Button>
        </>
    )
}

export default RemoveItemAlt