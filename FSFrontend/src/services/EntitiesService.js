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
        axios.get(URL, config)
        .then(res => {
            if(object == "tasks"){
                localStorage.setItem("taskList", JSON.stringify(res.data))
            }else if(object == "contacts"){
                localStorage.setItem("contactList", JSON.stringify(res.data))
            }else if(object == "notes"){
                localStorage.setItem("noteList", JSON.stringify(res.data))
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const allTaskByUser = () => {
    allByUser("tasks")
}

export const allContactsByUser = () => {
    allByUser("contacts")
}

export const allNotesByUser = () => {
    allByUser("notes")
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
        axios.delete(URL, config)
        .then(() => {
            allTaskByUser()
            allContactsByUser()
            allNotesByUser()
            location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
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
        axios.post(URL, entityToAdd, config)
        .then(() => {
            allTaskByUser()
            allContactsByUser()
            allNotesByUser()
            location.reload()
        })
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
        axios.delete(URL, config)
        .then(() => {
            allTaskByUser()
            allContactsByUser()
            allNotesByUser()
            location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const deleteAllTasks = () => {
    deleteAll("tasks")
}

export const deleteAllContacts = () => {
    deleteAll("contacts")
}

export const deleteAllNotes = () => {
    deleteAll("notes")
}