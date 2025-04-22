import { appCheck } from "#firebase-config"
import axios from "axios"
import { getToken } from "firebase/app-check"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

function getSongs(queries, signedInUserID){
    return getToken(appCheck).then(({token}) => {
        return api.get("/api/songs", {
            params: queries,
            headers: {
                "X-Firebase-AppCheck": token,
                "App-SignedInUser": signedInUserID
            }
        })
    })
    .then(({data}) => {
        return data.songs
    })
}

function getUsers(queries){
    return getToken(appCheck).then(({token}) => {
        return api.get("/api/users", {
            params: queries,
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
    .then(({data}) => {
        return data.users
    })
}

function getUserById(user_id){
    return getToken(appCheck).then(({token}) => {
        return api.get(`/api/users/${user_id}`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    }).then(({data}) => {
        return data.user
    })
}

function deleteUserFromDatabase(user_id){
    return getToken(appCheck).then(({token}) => {
        return api.delete(`/api/users/${user_id}`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
}

function getSongById(song_id, signedInUserID){
    return getToken(appCheck).then(({token}) => {
        return api.get(`/api/songs/${song_id}`, {
            headers: {
                "X-Firebase-AppCheck": token,
                "App-SignedInUser": signedInUserID
            }
        })
    }).then(({data}) => {
        return data.song
    })
}

function getAlbums(queries, signedInUserID){
    return getToken(appCheck).then(({token}) => {
        return api.get("/api/albums", {
            params: queries,
            headers: {
                "X-Firebase-AppCheck": token,
                "App-SignedInUser": signedInUserID
            }
        })
    }).then(({data}) => {
        return data.albums
    })
}

function getAlbumById(album_id, signedInUserID){
    return getToken(appCheck).then(({token}) => {
        return api.get(`/api/albums/${album_id}`, {
            headers: {
                "X-Firebase-AppCheck": token,
                "App-SignedInUser": signedInUserID
            }
        })
    }).then(({data}) => {
        return data.album
    })
}

function postUser(data){
    return getToken(appCheck).then(({token}) => {
        return api.post("/api/users", data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })  
    }).then(({data}) => {
        return data.user
    })
}

function patchUser(user_id, data){
    return getToken(appCheck).then(({token}) => {
        return api.patch(`/api/users/${user_id}`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
    .then(({data}) => {
        return data.user
    })
}

function getComments(contentType, content_id, signedInUserID){
    return getToken(appCheck).then(({token}) => {
        return api.get(`/api/${contentType}/${content_id}/comments`, {
            headers: {
                "X-Firebase-AppCheck": token,
                "App-SignedInUser": signedInUserID
            }
        })
    }).then(({data}) => {
        return data.comments;
    })
}

function getReplies(comment_id){
    return getToken(appCheck).then(({token}) => {
        return api.get(`/api/comments/${comment_id}/replies`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    }).then(({data}) => {
        return data.replies;
    })
}

function postComment(contentType, content_id, data){
    return getToken(appCheck).then(({token}) => {
        return api.post(`/api/${contentType}/${content_id}/comments`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    }).then(({data}) => {
        return data.comment;
    })
}

function postReply(comment_id, data){
    return getToken(appCheck).then(({token}) => {
        return api.post(`/api/comments/${comment_id}/replies`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
    .then(({data}) => {
        return data.reply
    })
}

function patchComment(comment_id, data){
    return getToken(appCheck).then(({token}) => {
        return api.patch(`/api/comments/${comment_id}`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    }).then(({data}) => {
        return data.comment;
    })
}

function deleteComment(comment_id){
    return getToken(appCheck).then(({token}) => {
        return api.delete(`/api/comments/${comment_id}`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        });
    })
}

function postAlbum(data){
    return getToken(appCheck).then(({token}) => {
        return api.post(`/api/albums`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    }).then(({data}) => {
        return data.album;
    })
}

function postSong(album_id, data){
    return getToken(appCheck).then(({token}) => {
        return api.post(`/api/albums/${album_id}/songs`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
    .then(({data}) => {
        return data.song
    })
}

function patchAlbum(album_id, data){
    return getToken(appCheck).then(({token}) => {
        return api.patch(`/api/albums/${album_id}`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
    .then(({data}) => {
        return data.album
    })
}

function deleteAlbum(album_id){
    return getToken(appCheck).then(({token}) => {
        return api.delete(`/api/albums/${album_id}`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
}

function patchSong(song_id, data){
    return getToken(appCheck).then(({token}) => {
        return api.patch(`/api/songs/${song_id}`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    }).then(({data}) => {
        return data.song;
    })
}

function deleteSong(song_id){
    return getToken(appCheck).then(({token}) => {
        return api.delete(`/api/songs/${song_id}`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
}

function getRatingByIds(contentType, user_id, content_id){
    return getToken(appCheck).then(({token}) => {
        return api.get(`/api/ratings/${contentType}/${content_id}/users/${user_id}`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    }).then(({data}) => {
        return data.rating;
    })
}

function postRating(contentType, content_id, data){
    return getToken(appCheck).then(({token}) => {
        return api.post(`/api/${contentType}/${content_id}/ratings`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
    .then(({data}) => {
        return data.rating;
    })
}

function patchRating(contentType, user_id, content_id, data){
    return getToken(appCheck).then(({token}) => {
        return api.patch(`/api/ratings/${contentType}/${content_id}/users/${user_id}`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
    .then(({data}) => {
        return data.rating;
    })
}

function deleteRating(contentType, user_id, content_id){
    return getToken(appCheck).then(({token}) => {
        return api.delete(`/api/ratings/${contentType}/${content_id}/users/${user_id}`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
}

function postFollow(follower_id, following_id){
    return getToken(appCheck).then(({token}) => {
        return api.post(`/api/follows/follower/${follower_id}/following/${following_id}`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    }).then(({data}) => {
        return data.follow;
    })
}

function removeFollow(follower_id, following_id){
    return getToken(appCheck).then(({token}) => {
        return api.delete(`/api/follows/follower/${follower_id}/following/${following_id}`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
}

function getNotificationsFromUser(user_id){
    return getToken(appCheck).then(({token}) => {
        return api.get(`/api/users/${user_id}/notifications`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    }).then(({data}) => {
        return data.notifications;
    })
}

function postNotification(data){
    return getToken(appCheck).then(({token}) => {
        return api.post("/api/notifications", data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
    .then(({data}) => {
        return data.notification;
    })
}

function patchNotification(notification_id){
    return getToken(appCheck).then(({token}) => {
        return api.patch(`/api/notifications/${notification_id}`, null, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
    .then(({data}) => {
        return data.notification;
    })
}

function getCommentById(comment_id){
    return getToken(appCheck).then(({token}) => {
        return api.get(`/api/comments/${comment_id}`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
    .then(({data}) => {
        return data
    })
}

function getLinks(user_id){
    return getToken(appCheck).then(({token}) => {
        return api.get(`/api/users/${user_id}/links`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    }).then(({data}) => {
        return data.links;
    })
}

function postLink(user_id, data){
    return getToken(appCheck).then(({token}) => {
        return api.post(`/api/users/${user_id}/links`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        }).then(({data}) => {
            return data.link;
        })
    })
}

function patchLink(link_id, data){
    return getToken(appCheck).then(({token}) => {
        return api.patch(`/api/links/${link_id}`, data, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        }).then(({data}) => {
            return data.link;
        })
    })
}

function deleteLink(link_id){
    return getToken(appCheck).then(({token}) => {
        return api.delete(`/api/links/${link_id}`, {
            headers: {
                "X-Firebase-AppCheck": token
            }
        })
    })
}

export { getSongs, getUsers, getUserById, deleteUserFromDatabase, getSongById, getAlbums, getAlbumById, postUser, patchUser, getComments, getReplies, postComment, postReply, patchComment, deleteComment, postAlbum, postSong, patchAlbum, deleteAlbum, patchSong, deleteSong, getRatingByIds, postRating, patchRating, deleteRating, postFollow, removeFollow, getNotificationsFromUser, postNotification, patchNotification, getCommentById, getLinks, postLink, patchLink, deleteLink }