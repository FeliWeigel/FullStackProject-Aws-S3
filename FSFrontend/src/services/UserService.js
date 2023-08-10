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

export const getUserDetails = () => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/users/user_details/${sessionStorage.getItem("access_token").toString()}`
        let token = sessionStorage.getItem("access_token")
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        return axios.get(URL, config)
        .catch(err => {
            throw err
        })
    }
}

export const userLogout = () => {
    const URL = ApiUrlBase + "/auth/logout"
    axios.post(URL)
    .then(res => {
        console.log(res.data)
        sessionStorage.removeItem("access_token")
        sessionStorage.removeItem("refresh_token")
        sessionStorage.removeItem("isLogged")
        sessionStorage.removeItem("taskRemove")
        localStorage.removeItem("taskList")
        localStorage.removeItem("contactList")
        localStorage.removeItem("noteList")
        location.reload()
    })
    .catch(err => {
        console.log(err)
    })    
}

export const updateUserProfile = (updateRequest) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/users/update/${sessionStorage.getItem("access_token").toString()}`
        let token = sessionStorage.getItem("access_token")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return axios.put(URL, updateRequest, config)
        .catch(err => {
            throw err
        })
    }
}

export const uploadUserProfileImage = async(formData) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/users/update/${sessionStorage.getItem("access_token").toString()}/profile-image`
        let token = sessionStorage.getItem("access_token")
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        return axios.post(URL, formData, config)
        .then(() => {
            location.reload()
        })
        .catch(err => {
            throw err
        })
    }
}


export const getUserProfileImageUrl = () => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){    
        return ApiUrlBase + `/users/user_details/profile-image/${sessionStorage.getItem("access_token").toString()}`
    }
}
