import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext";
import { getUserById } from "../../../../api";
import ForbiddenAccess from "../../errors/ForbiddenAccess";
import Loading from "../../Loading";
import { List } from "@mui/material";
import NotificationCard from "./NotificationCard";

function NotificationsPage(){
    const {user_id} = useParams();
    const {signedInUser} = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getUserById(user_id).then(({received_notifications}) => {
            setNotifications(received_notifications);
            setIsLoading(false);
        }).catch((err) => {
            setError("Error fetching notifications. Please try again later.");
            setIsLoading(false);
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(signedInUser.user_id !== user_id){
        return <ForbiddenAccess/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>Your Notifications</h2>
        {notifications.length === 0 ? <p>You don't have any notifications yet</p> : 
            <List>
                {notifications.map((notification) => {
                    return <NotificationCard key={`notification-${notification.comment_notification_id}`} notification={notification} setNotifications={setNotifications}/>
                }).reverse()}
            </List>
        }
    </section>)
}

export default NotificationsPage