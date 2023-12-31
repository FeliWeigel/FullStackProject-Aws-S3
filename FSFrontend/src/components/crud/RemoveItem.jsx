/* eslint-disable react/prop-types */
import Icon from "react-icons-kit"
import {trash} from 'react-icons-kit/fa/trash'
import { deleteEntity } from "../../services/EntitiesService"

const RemoveItem = ({model, id}) => {
    
    function remove(){
        if(model == "task"){
            deleteEntity("tasks", id)
            .then(() => {
                location.reload()
            })
        }else if(model == "contact"){
            deleteEntity("contacts", id)
            .then(() => {
                location.reload()
            })
        }
    }

    return (
        <button onClick={remove}>
            <Icon className="trash-icon" icon={trash} size={21}></Icon>
        </button>
    )
}

export default RemoveItem