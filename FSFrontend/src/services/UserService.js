import axios from "axios"
import { ApiUrlBase } from "../utils/ApiUrlBase"

export const userLogout = () => {
    const URL = ApiUrlBase + "/auth/logout"
    axios.post(URL)
    .then(res => {
        console.log(res.data)
        sessionStorage.removeItem("access_token")
        sessionStorage.removeItem("refresh_token")
        sessionStorage.removeItem("isLogged")
        sessionStorage.removeItem("taskRemove")
        location.reload()
    })
    .catch(err => {
        console.log(err)
    })    
}