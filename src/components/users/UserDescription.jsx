import { useEffect, useState } from "react"
import { getUserById } from "../../../api";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import formatDate from "../../utils/format-date";

function UserDescription(){
    const {user_id} = useParams()
    const [description, setDescription] = useState("");
    const [memberSince, setMemberSince] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        getUserById(user_id).then((user) => {
            setIsLoading(false);
            setDescription(user.description);
            setMemberSince(user.member_since);
        }).catch((err) => {
            setIsLoading(false);
            setError("Error fetching user description. Please try again later.")
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>Description</h2>
            <p>{description}</p>
            <p>Member since: {formatDate(new Date(memberSince))}</p>
    </section>)
}

export default UserDescription