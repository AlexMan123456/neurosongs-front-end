import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

function getSongs(queries){
    return api.get("/api/songs", {params: queries}).then(({data}) => {
        return data.songs
    })
}

function getUsers(queries){
    return api.get("/api/users", {params: queries}).then(({data}) => {
        return data.users
    })
}

function getUserById(user_id){
    return api.get(`/api/users/${user_id}`).then(({data}) => {
        return data.user
    })
}

function deleteUserFromDatabase(user_id){
    return api.delete(`/api/users/${user_id}`)
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

function getReplies(comment_id){
    return api.get(`/api/comments/${comment_id}/replies`).then(({data}) => {
        return data.replies;
    })
}

function postComment(contentType, content_id, data){
    return api.post(`/api/${contentType}/${content_id}/comments`, data).then(({data}) => {
        return data.comment;
    })
}

function postReply(comment_id, data){
    return api.post(`/api/comments/${comment_id}/replies`, data).then(({data}) => {
        return data.reply
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

function postSong(album_id, data){
    return api.post(`/api/albums/${album_id}/songs`, data).then(({data}) => {
        return data.song
    })
}

function patchAlbum(album_id, data){
    return api.patch(`/api/albums/${album_id}`, data).then(({data}) => {
        return data.album
    })
}

function deleteAlbum(album_id){
    return api.delete(`/api/albums/${album_id}`)
}

function patchSong(song_id, data){
    return api.patch(`/api/songs/${song_id}`, data).then(({data}) => {
        return data.song;
    })
}

function deleteSong(song_id){
    return api.delete(`/api/songs/${song_id}`)
}

function getRatingByIds(contentType, user_id, content_id){
    return api.get(`/api/ratings/${contentType}/${content_id}/users/${user_id}`).then(({data}) => {
        return data.rating;
    })
}

function postRating(contentType, content_id, data){
    return api.post(`/api/${contentType}/${content_id}/ratings`, data).then(({data}) => {
        return data.rating;
    })
}

function patchRating(contentType, user_id, content_id, data){
    return api.patch(`/api/ratings/${contentType}/${content_id}/users/${user_id}`, data).then(({data}) => {
        return data.rating;
    })
}

function deleteRating(contentType, user_id, content_id){
    return api.delete(`/api/ratings/${contentType}/${content_id}/users/${user_id}`)
}

function postFollow(follower_id, following_id){
    return api.post(`/api/follows/follower/${follower_id}/following/${following_id}`).then(({data}) => {
        return data.follow;
    })
}

function removeFollow(follower_id, following_id){
    return api.delete(`/api/follows/follower/${follower_id}/following/${following_id}`)
}

function getNotificationsFromUser(user_id){
    return api.get(`/api/users/${user_id}/notifications`).then(({data}) => {
        return data.notifications;
    })
}

function postNotification(data){
    return api.post("/api/notifications", data).then(({data}) => {
        return data.notification;
    })
}

function patchNotification(notification_id){
    return api.patch(`/api/notifications/${notification_id}`).then(({data}) => {
        return data.notification;
    })
}

export { getSongs, getUsers, getUserById, deleteUserFromDatabase, getSongById, getAlbums, getAlbumById, postUser, patchUser, getComments, getReplies, postComment, postReply, patchComment, deleteComment, postAlbum, postSong, patchAlbum, deleteAlbum, patchSong, deleteSong, getRatingByIds, postRating, patchRating, deleteRating, postFollow, removeFollow, getNotificationsFromUser, postNotification, patchNotification }