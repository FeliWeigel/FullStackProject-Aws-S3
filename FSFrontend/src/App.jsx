import { Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import TasksPage from "./pages/TasksPage"
import CalendarPage from "./pages/CalendarPage"
function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<DashboardPage/>}></Route>
        <Route exact path="/auth/register" element={<RegisterPage/>}></Route>
        <Route exact path="/auth/login" element={<LoginPage/>}></Route>
        <Route exact path="/task_list" element={<TasksPage/>}></Route>
        <Route exact path="/calendar" element={<CalendarPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
