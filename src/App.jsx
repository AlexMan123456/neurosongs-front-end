import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Homepage from "./components/Homepage"
import UserPage from "./components/users/UserPage"
import SongPlayer from "./components/songs/SongPlayer"
import SongsPage from "./components/songs/SongsPage"
import AlbumPage from "./components/albums/AlbumPage"
import SignInPage from "./components/users/SignInPage"

function App() {
  return (<>
    <Header/>
    <Routes>
      <Route path="" element={<Homepage/>}/>
      <Route path="/users/:username" element={<UserPage/>}/>
      <Route path="/songs/:song_id" element={<SongPlayer/>}/>
      <Route path="/search" element={<SongsPage/>}/>
      <Route path="/albums/:album_id" element={<AlbumPage/>}/>
      <Route path="/sign_in" element={<SignInPage/>}/>
    </Routes>
  </>)
}

export default App
