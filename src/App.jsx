import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Homepage from "./components/Homepage"
import UserPage from "./components/users/UserPage"

function App() {
  return (<>
    <Header/>
    <Routes>
      <Route path="" element={<Homepage/>}/>
      <Route path="/users/:username" element={<UserPage/>}/>
    </Routes>
  </>)
}

export default App
