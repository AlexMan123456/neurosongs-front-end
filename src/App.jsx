import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Homepage from "./components/Homepage"
import UserPage from "./components/users/UserPage"
import SongPlayer from "./components/songs/SongPlayer"
import SongsPage from "./components/songs/SongsPage"

function App() {
  return (<>
    <Header/>
    <Routes>
      <Route path="" element={<Homepage/>}/>
      <Route path="/users/:username" element={<UserPage/>}/>
      <Route path="/songs/:song_id" element={<SongPlayer/>}/>
      <Route path="/songs" element={<SongsPage/>}/>
    </Routes>
  </>)
}

export default App
