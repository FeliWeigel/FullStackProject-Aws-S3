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

export const allByUser = (object) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/all/`
        
        return axios.get(URL, config())
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

export const getByUser = (object, id) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/all/${id}`
        
        return axios.get(URL, config())
        .catch(err => {
            console.log(err)
        })
    }
}

export const getNoteByUser = (id) => {
    return getByUser("notes", id)
}

export const addEntity = (object, entityToAdd) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/add/`
        
        return axios.post(URL, entityToAdd, config())
    }
}

export const updateEntity = (object, entityUpdated) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/update/`
        
        return axios.put(URL, entityUpdated, config())
    }
}

export const deleteEntity = (object, id) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/delete/${id}/${sessionStorage.getItem("access_token").toString()}`
        
        return axios.delete(URL, config())
        .catch(err => {
            console.log(err)
        })
    }
}

export const deleteAll = (object) => {
    if(sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("isLogged") == "true"){     
        const URL = ApiUrlBase + `/${object}/delete/all/${sessionStorage.getItem("access_token").toString()}`
        
        return axios.delete(URL, config())
        
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
    
        return axios.get(URL, config())
        .catch(err => {
            console.log(err)
        })
    }
}