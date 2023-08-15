import axios from "axios"
import { ApiUrlBase } from "../utils/ApiUrlBase"

export const allByUser = (object) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/all/` + sessionStorage.getItem("access_token").toString()
        let token = sessionStorage.getItem("access_token")
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return axios.get(URL, config)
        .catch(err => {
            console.log(err)
        })
    }
}

export const allTaskByUser = () => {
    return allByUser("tasks")
}

export const allContactsByUser = () => {
    return allByUser("contacts")
}

export const allNotesByUser = () => {
    return allByUser("notes")
}

export const addEntity = (object, entityToAdd) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/add/${sessionStorage.getItem("access_token").toString()}`
        let token = sessionStorage.getItem("access_token")
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return axios.post(URL, entityToAdd, config)
    }
}

export const updateEntity = (object, entityUpdated) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/update/${sessionStorage.getItem("access_token").toString()}`
        let token = sessionStorage.getItem("access_token")
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return axios.put(URL, entityUpdated, config)
    }
}

export const deleteEntity = (object, id) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/delete/${id}/${sessionStorage.getItem("access_token").toString()}`
        let token = sessionStorage.getItem("access_token")
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        return axios.delete(URL, config)
        .catch(err => {
            console.log(err)
        })
    }
}

export const deleteAll = (object) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/delete/all/${sessionStorage.getItem("access_token").toString()}`
        let token = sessionStorage.getItem("access_token")
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        return axios.delete(URL, config)
        
    }
}

export const deleteAllTasks = () => {
    return deleteAll("tasks")
}

export const deleteAllContacts = () => {
    return deleteAll("contacts")
}

export const deleteAllNotes = () => {
    return deleteAll("notes")
}

export const countEntity = (object) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/count/${sessionStorage.getItem("access_token").toString()}`
        let token = sessionStorage.getItem("access_token")
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        return axios.get(URL, config)
        .catch(err => {
            console.log(err)
        })
    }
}