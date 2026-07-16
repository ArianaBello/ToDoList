import { Route, Routes } from "react-router-dom"
import { Login } from "./components/Login"
import ToDoList from "./components/ToDoList"

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/task" element={<ToDoList/>}/>
    </Routes>
  )
}

export default App
