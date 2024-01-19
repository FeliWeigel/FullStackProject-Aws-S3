import axios from "axios"
import { ApiUrlBase } from "../utils/ApiUrlBase"

export const config = () => {
    let token = sessionStorage.getItem("access_token")
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const handleCompleteTask = (task) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/tasks/complete`
        
        axios.put(URL, task, config())
        .then(() => {
            location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
}