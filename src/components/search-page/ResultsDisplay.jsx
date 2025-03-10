import { useEffect, useState } from "react"
import { getAlbums, getSongs, getUsers } from "../../../api";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import wait from "../../utils/wait";
import Loading from "../Loading";
import SongResults from "./content-display/SongResults";
import AlbumResults from "./content-display/AlbumResults";
import UserResults from "./content-display/UserResults";
import { Button } from "@mui/material";

function ResultsDisplay({searchFor, setSearchQuery}){
    const [searchParams, setSearchParams] = useSearchParams();
    const search_query = searchParams.get("search_query");
    const location = useLocation();
    const navigate = useNavigate();
    const {search_for} = useParams();

    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if(search_query){
            setIsLoading(true);
            const getContent = {
                songs: getSongs({search_query}),
                albums: getAlbums({search_query}),
                users: getUsers({search_query})
            }[searchFor]

            getContent.then((content) => {
                setContent(content);
                setIsLoading(false);
            }).catch((err) => {
                setError("Error fetching search results. Please try again later.")
                return wait(4).then(() => {
                    setError("");
                })
            })
        }
    }, [search_query])

    useEffect(() => {
        handleReset()
    }, [search_for])

    function handleReset(){
        searchParams.delete("search_query");
        setSearchQuery("");
        setContent([]);
        navigate(location.pathname);
    }

    if(isLoading){
        return <Loading/>
    }

    return (<>
        {search_query ? <Button color="text" onClick={handleReset}>Reset Search</Button> : null}
        {content.length > 0 ? 
        {
            songs: <SongResults songs={content}/>,
            albums: <AlbumResults albums={content}/>,
            users: <UserResults users={content}/>
        }[searchFor]
        : null}
        {error ? <p>{error}</p> : null}
    </>)
}

export default ResultsDisplay