/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

import Icon from "react-icons-kit"
import {edit} from 'react-icons-kit/fa/edit'

const UpdateItem = ({object, entityId}) => {
  return (
    <>
      {object === "tasks" ? 
        <Link to={`/task_list/update/${entityId}`}>
          <Icon className="edit-icon" icon={edit} size={20}></Icon>
        </Link> : 
       object === "contacts" ?
        <Link to={`/contacts/update/${entityId}`}>
          <Icon className="edit-icon" icon={edit} size={20}></Icon>
        </Link> : null
      }
    </>
  )
}

export default UpdateItem