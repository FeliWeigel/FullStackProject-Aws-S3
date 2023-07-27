import axios from "axios"
import { ApiUrlBase } from "../utils/ApiUrlBase"

export const allTaskByUser = () => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + "/tasks/all/" + sessionStorage.getItem("access_token").toString()
        let token = sessionStorage.getItem("access_token")
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get(URL, config)
        .then(res => {
            localStorage.setItem("taskList", JSON.stringify(res.data))
            console.log(JSON.stringify(res.data))
        })
        .catch(err => {
            console.log(err.data)
        })
    }
}
