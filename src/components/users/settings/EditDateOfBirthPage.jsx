import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import verifyUserAge from "../../../utils/verify-user-age";
import { UserContext } from "../../../contexts/UserContext";
import wait from "../../../utils/wait";
import dayjs from "dayjs";
import { getUserById, patchUser } from "../../../../api";
import Loading from "../../Loading";
import ForbiddenAccess from "../../errors/ForbiddenAccess";

function EditDateOfBirthPage(){
    const {user_id} = useParams()
    const {signedInUser, setSignedInUser} = useContext(UserContext); 
    const [dateOfBirth, setDateOfBirth] = useState(dayjs());
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true);
        getUserById(user_id).then(({date_of_birth}) => {
            setDateOfBirth(dayjs(new Date(date_of_birth)));
            setIsLoading(false);
        }).catch((err) => {
            setError("Error getting date of birth. Please try again later.")
            return wait(4).then(() => {
                setError("");
            })
        })
    }, [])

    function handleSubmit(){
        if(!verifyUserAge(new Date(dateOfBirth), 13)){
            setDateOfBirthError("You must be 13 years old or older to create an account on this site.");
            return;
        }
        
        setIsLoading(true);
        return patchUser(user_id, {
            date_of_birth: new Date(dateOfBirth.format())
        }).then((user) => {
            setSignedInUser(user);
            return wait(2);
        }).then(() => {
            setIsLoading(false);
            navigate("/")
        })
        .catch((err) => {
            setIsLoading(false);
            setError("Error setting your date of birth. Please try again later.")
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    if(signedInUser.user_id !== user_id){
        return <ForbiddenAccess/>
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>Please confirm your date of birth</h2>
        <DatePicker
            label="Date of birth"
            value={dateOfBirth}
            onChange={(newDateOfBirth) => {setDateOfBirth(newDateOfBirth)}}
        />
        <br/>
        {dateOfBirthError ? <p>{dateOfBirthError}</p> : null}
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </section>)
}

export default EditDateOfBirthPage