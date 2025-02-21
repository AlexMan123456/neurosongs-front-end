import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Homepage from "./components/Homepage"
import UserPage from "./components/users/UserPage"
import SongPlayer from "./components/songs/SongPlayer"
import SongsPage from "./components/songs/SongsPage"
import AlbumPage from "./components/albums/AlbumPage"
import GetEmailForSignUpPage from "./components/users/sign-in/GetEmailForSignUpPage"
import SignInPage from "./components/users/sign-in/SignInPage"
import CompleteSignUpPage from "./components/users/sign-in/CompleteSignUpPage"
import UserSettingsPage from "./components/users/settings/UserSettingsPage"
import LoadingPage from "./components/LoadingPage"

function App() {
  return (<>
    <Header/>
    <Routes>
      <Route path="" element={<Homepage/>}/>
      <Route path="/users/:user_id" element={<UserPage/>}/>
      <Route path="/songs/:song_id" element={<SongPlayer/>}/>
      <Route path="/search" element={<SongsPage/>}/>
      <Route path="/albums/:album_id" element={<AlbumPage/>}/>
      <Route path="/sign_in" element={<SignInPage/>}/>
      <Route path="/create_account" element={<GetEmailForSignUpPage/>}/>
      <Route path="/complete_signup" element={<CompleteSignUpPage/>}/>
      <Route path="/users/:user_id/settings" element={<UserSettingsPage/>}/>
      <Route path="/loading" element={<LoadingPage/>}/>
    </Routes>
  </>)
}

export default App
