import { Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<DashboardPage/>}></Route>
        <Route exact path="/auth/register" element={<RegisterPage/>}></Route>
        <Route exact path="/auth/login" element={<LoginPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
