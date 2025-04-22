import { Route, Routes } from "react-router-dom"
import FeaturedPage from "./components/FeaturedPage"
import UserPage from "./components/users/UserPage"
import AlbumPage from "./components/albums/AlbumPage"
import GetEmailForSignUpPage from "./components/users/sign-in/email-sign-up/GetEmailForSignUpPage"
import SignInPage from "./components/users/sign-in/SignInPage"
import CompleteSignUpPage from "./components/users/sign-in/email-sign-up/CompleteSignUpPage"
import UserSettingsPage from "./components/users/settings/UserSettingsPage"
import LoadingPage from "./components/LoadingPage"
import Header from "./components/header/Header"
import SongPage from "./components/songs/SongPage"
import UserDisplayInfoEditPage from "./components/users/settings/UserDisplayInfoEditPage"
import EditDateOfBirthPage from "./components/users/settings/EditDateOfBirthPage"
import GetEmailToResetPassword from "./components/users/sign-in/reset-password/GetEmailToResetPassword"
import Homepage from "./components/Homepage"
import AlbumCreator from "./components/albums/album-creation/AlbumCreator"
import AlbumCoverEditor from "./components/albums/album-creation/AlbumCoverEditor"
import AlbumSongAdderPage from "./components/albums/album-creation/AlbumSongAdderPage"
import AlbumSelector from "./components/songs/song-creation/AlbumSelector"
import SongAdder from "./components/songs/song-creation/SongAdder"
import Footer from "./components/Footer"
import PageNotFound from "./components/errors/PageNotFound"
import SongEditPage from "./components/songs/song-edit/SongEditPage"
import SearchPage from "./components/search-page/SearchPage"
import ShowFollows from "./components/users/follows/ShowFollows"
import NotificationsPage from "./components/users/notifications/NotificationsPage"
import { useContext } from "react"
import AlbumEditPage from "./components/albums/edit-page/AlbumEditPage"
import { ScreenSizeContext } from "./contexts/ScreenSizeContext"
import CompleteGoogleSignup from "./components/users/sign-in/google-sign-in/CompleteGoogleSignup"
import SingleCommentPage from "./components/comments/SingleCommentPage"
import RecentsPage from "#components/RecentsPage"
import EditUserLinksSection from "#components/users/settings/EditUserLinksSection"

function App() {
  const {isLargeScreen} = useContext(ScreenSizeContext)

  return (<>
    <Header/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/featured" element={<FeaturedPage/>}/>
      <Route path="/users/:user_id" element={<UserPage/>}/>
      <Route path="/songs/:song_id" element={<SongPage/>}/>
      <Route path="/search" element={<SearchPage/>}/>
      <Route path="/search/:search_for" element={<SearchPage/>}/>
      <Route path="/albums/:album_id" element={<AlbumPage/>}/>
      <Route path="/sign_in" element={<SignInPage/>}/>
      <Route path="/sign_in/create_account" element={<GetEmailForSignUpPage/>}/>
      <Route path="/complete_signup" element={<CompleteSignUpPage/>}/>
      <Route path="/complete_signup_with_google" element={<CompleteGoogleSignup/>}/>
      <Route path="/users/settings" element={<UserSettingsPage/>}/>
      <Route path="/users/:user_id/:category" element={<UserPage/>}/>
      <Route path="/users/:user_id/followers" element={<ShowFollows/>}/>
      <Route path="/users/:user_id/following" element={<ShowFollows/>}/>
      <Route path="/users/:user_id/notifications" element={<NotificationsPage/>}/>
      <Route path="/loading" element={<LoadingPage/>}/>
      <Route path="/users/settings/:user_id/edit_display" element={<UserDisplayInfoEditPage/>}/>
      <Route path="/users/settings/:user_id/edit_links" element={<EditUserLinksSection/>}/>
      <Route path="/users/settings/:user_id/edit_date_of_birth" element={<EditDateOfBirthPage/>}/>
      <Route path="/sign_in/reset_password" element={<GetEmailToResetPassword/>}/>
      <Route path="/users/:user_id/albums/create" element={<AlbumCreator/>}/>
      <Route path="/users/:user_id/songs/create" element={<AlbumSelector/>}/>
      <Route path="/albums/:album_id/songs/create" element={<SongAdder/>}/>
      <Route path="/users/:user_id/albums/create/set_album_covers/:album_id" element={<AlbumCoverEditor/>}/>
      <Route path="/users/:user_id/albums/create/add_songs/:album_id" element={<AlbumSongAdderPage/>}/>
      <Route path="/albums/:album_id/edit" element={<AlbumEditPage/>}/>
      <Route path="/songs/:song_id/edit" element={<SongEditPage/>}/>
      <Route path="/comments/:comment_id" element={<SingleCommentPage/>}/>
      <Route path="/recent" element={<RecentsPage/>}/>
      <Route path="/recent/:category" element={<RecentsPage/>}/>
      <Route path="/*" element={<PageNotFound/>}/>
    </Routes>
    <br/>
    {isLargeScreen ? <Footer/> : null}
  </>)
}

export default App
