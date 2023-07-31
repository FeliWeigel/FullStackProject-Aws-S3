import Icon from "react-icons-kit"
import {trash} from 'react-icons-kit/fa/trash'
import { deleteEntity } from "../../services/EntitiesService"

const RemoveItem = ({model, id}) => {
    
    function remove(){
        if(model == "task"){
            deleteEntity("tasks", id)
            location.reload()
            location.reload()
        }
    }

    return (
        <button onClick={remove}>
            <Icon className="trash-icon" icon={trash} size={20}></Icon>
        </button>
    )
}

export default RemoveItem