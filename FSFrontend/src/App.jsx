import { Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import TasksPage from "./pages/TasksPage"
import CalendarPage from "./pages/CalendarPage"
import AddTaskPage from "./pages/AddTaskPage"
import AddContactPage from "./pages/AddContactPage"
import AddNotePage from "./pages/AddNotePage"
import ContactsPage from "./pages/ContactsPage"
import NotesPage from "./pages/NotesPage"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import UserProfilePage from "./pages/UserProfilePage"
import UpdateTaskPage from "./pages/UpdateTaskPage"
function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<DashboardPage/>}></Route>
        <Route exact path="/auth/register" element={<RegisterPage/>}></Route>
        <Route exact path="/auth/login" element={<LoginPage/>}></Route>
        <Route exact path="/user/profile" element={<UserProfilePage/>}></Route>
        <Route exact path="/user/profile/update" element={<UpdateProfilePage/>}></Route>
        <Route exact path="/task_list" element={<TasksPage/>}></Route>
        <Route exact path="/task_list/add" element={<AddTaskPage/>}></Route>
        <Route exact path="/task_list/update/:taskId" element={<UpdateTaskPage/>}></Route>
        <Route exact path="/contacts" element={<ContactsPage/>}></Route>
        <Route exact path="/contacts/add" element={<AddContactPage/>}></Route>
        <Route exact path="/notes" element={<NotesPage/>}></Route>
        <Route exact path="/notes/add" element={<AddNotePage/>}></Route>
        <Route exact path="/calendar" element={<CalendarPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
