import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

function getSongs(queries){
    return api.get("/api/songs", {params: queries}).then(({data}) => {
        return data.songs
    })
}

function getUsers(){
    return api.get("/api/users").then(({data}) => {
        return data.users
    })
}

function getUserById(user_id){
    return api.get(`/api/users/${user_id}`).then(({data}) => {
        return data.user
    })
}

function getSongById(song_id){
    return api.get(`/api/songs/${song_id}`).then(({data}) => {
        return data.song
    })
}

function getAlbums(queries){
    return api.get("/api/albums", {params: queries}).then(({data}) => {
        return data.albums
    })
}

function getAlbumById(album_id){
    return api.get(`/api/albums/${album_id}`).then(({data}) => {
        return data.album
    })
}

function postUser(data){
    return api.post("/api/users", data).then(({data}) => {
        return data.user
    })
}

function patchUser(user_id, data){
    return api.patch(`/api/users/${user_id}`, data).then(({data}) => {
        return data.user
    })
}

function getComments(contentType, content_id){
    return api.get(`/api/${contentType}/${content_id}/comments`).then(({data}) => {
        return data.comments;
    })
}

function postComment(contentType, content_id, data){
    return api.post(`/api/${contentType}/${content_id}/comments`, data).then(({data}) => {
        return data.comment;
    })
}

function patchComment(comment_id, data){
    return api.patch(`/api/comments/${comment_id}`, data).then(({data}) => {
        return data.comment;
    })
}

function deleteComment(comment_id){
    return api.delete(`/api/comments/${comment_id}`);
}

function postAlbum(data){
    return api.post(`/api/albums`, data).then(({data}) => {
        return data.album;
    })
}

export { getSongs, getUsers, getUserById, getSongById, getAlbums, getAlbumById, postUser, patchUser, getComments, postComment, patchComment, deleteComment, postAlbum }