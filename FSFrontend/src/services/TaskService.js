import axios from "axios"
import { ApiUrlBase } from "../utils/ApiUrlBase"
import { allTaskByUser } from "./EntitiesService"

export const handleCompleteTask = (task) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/tasks/complete/${sessionStorage.getItem("access_token").toString()}`
        let token = sessionStorage.getItem("access_token")
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.put(URL, task, config)
        .then(() => {
            allTaskByUser()
            location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
}