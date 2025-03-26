import { ListItem, ListItemButton, ListItemText } from "@mui/material"
import { Fragment, useContext } from "react";
import Markdown from "react-markdown";
import { Link } from "react-router-dom"
import { patchNotification } from "../../../../api";
import { UserContext } from "../../../contexts/UserContext";
import getContentIDFromComment from "../../../utils/get-content-id-from-comment";

function NotificationCard({notification, setNotifications}){
    const contentType = notification.comment.song || notification.comment.replying_to.song ? "songs" : (notification.comment.album || notification.comment.replying_to.album ?"albums" : null);
    const content_id = getContentIDFromComment(notification.comment);
    const {setCheckNotifications} = useContext(UserContext)

    function handleClick(){
        if(!notification.is_viewed){
            patchNotification(notification.comment_notification_id).then((notification) => {
                setNotifications((notifications) => {
                    const newNotifications = [...notifications];
                    const notificationIndex = newNotifications.map((notificationFromMap) => {
                        return notificationFromMap.comment_notification_id
                    }).indexOf(notification.comment_notification_id)
                    newNotifications[notificationIndex].is_viewed = true;
                    return newNotifications
                })
                setCheckNotifications((checkNotifications) => {
                    return !checkNotifications
                })
            })
        }
    }

    return (<ListItem sx={{border: 0.5, borderRadius: 0.7}}>
        <ListItemButton
            component={Link}
            to={`/${contentType}/${content_id}`}
            sx={{color: !notification.is_viewed ? "blue" : null}}
            onClick={handleClick}
        >
            {notification.message.split("\n").map((line, index) => {
                return <Fragment key={`notification-${notification.comment_notification_id}-line-${index}`}>{line}<br/></Fragment>
            })}
        </ListItemButton>
    </ListItem>)
}

export default NotificationCard