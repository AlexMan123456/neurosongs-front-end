import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

function getSongs(queries){
    return api.get("/api/songs", {params: {...queries}}).then(({data}) => {
        return data.songs
    })
}

function getUserByUsername(username){
    return api.get(`/api/users/${username}`).then(({data}) => {
        return data.user
    })
}

function getSongsFromUser(username){
    return api.get(`/api/users/${username}/songs`).then(({data}) => {
        return data.songs
    })
}

function getSong(song_id){
    return api.get(`/api/songs/${song_id}`).then(({data}) => {
        return data.song
    })
}

export { getSongs, getUserByUsername, getSongsFromUser, getSong }