import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

function getAllSongs(){
    return api.get("/api/songs").then(({data}) => {
        return data.songs
    })
}

export { getAllSongs }