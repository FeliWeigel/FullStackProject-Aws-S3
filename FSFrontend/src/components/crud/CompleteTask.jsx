/* eslint-disable react/prop-types */
import Icon from "react-icons-kit"
import { handleCompleteTask } from "../../services/TaskService"
import {checkboxChecked} from 'react-icons-kit/icomoon/checkboxChecked'
const CompleteTask = ({task}) => {
    
    function complete(){
        handleCompleteTask(task)
    }

    return (
        <button onClick={complete}>
            <Icon className="complete-icon" icon={checkboxChecked} size={18}></Icon>
        </button>
    )
}

export default CompleteTask