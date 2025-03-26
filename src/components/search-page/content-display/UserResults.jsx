import { List } from "@mui/material"
import UserCard from "../../users/UserCard"

function UserResults({users}){
    return (
        <List>
            {users.map((user) => {
                return <UserCard user={user}/>
            })}
        </List>
    )
}

export default UserResults