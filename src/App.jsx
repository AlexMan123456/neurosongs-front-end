import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Homepage from "./components/Homepage"
import UserPage from "./components/users/UserPage"
import SongPlayer from "./components/songs/SongPlayer"

function App() {
  return (<>
    <Header/>
    <Routes>
      <Route path="" element={<Homepage/>}/>
      <Route path="/users/:username" element={<UserPage/>}/>
      <Route path="/songs/:song_id" element={<SongPlayer/>}/>
    </Routes>
  </>)
}

export default App
