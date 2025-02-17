import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Homepage from "./components/Homepage"

function App() {
  return (<>
    <Header/>
    <Routes>
      <Route path="" element={<Homepage/>}/>
    </Routes>
  </>)
}

export default App
