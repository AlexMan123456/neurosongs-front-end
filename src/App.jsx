import { Route, Routes } from "react-router-dom"
import Homepage from "./components/Homepage"
import UserPage from "./components/users/UserPage"
import AlbumPage from "./components/albums/AlbumPage"
import GetEmailForSignUpPage from "./components/users/sign-in/GetEmailForSignUpPage"
import SignInPage from "./components/users/sign-in/SignInPage"
import CompleteSignUpPage from "./components/users/sign-in/CompleteSignUpPage"
import UserSettingsPage from "./components/users/settings/UserSettingsPage"
import LoadingPage from "./components/LoadingPage"
import Header from "./components/header/Header"
import SongPage from "./components/songs/SongPage"
import SongsList from "./components/songs/SongsList"

function App() {
  return (<>
    <Header/>
    <Routes>
      <Route path="" element={<Homepage/>}/>
      <Route path="/users/:user_id" element={<UserPage/>}/>
      <Route path="/songs/:song_id" element={<SongPage/>}/>
      <Route path="/search" element={<SongsList/>}/>
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
