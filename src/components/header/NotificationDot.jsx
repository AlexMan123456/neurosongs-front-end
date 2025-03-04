import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getUserById } from "../../../api";
import StyledBadge from "../styling/StyledBadge";

function NotificationDot({notificationCount, setNotificationCount, children}){
    const {signedInUser, checkNotifications, setCheckNotifications} = useContext(UserContext);

    setInterval(() => {
        setCheckNotifications((checkNotifications) => {
            return !checkNotifications
        })
    }, 60000)

    useEffect(() => {
        getUserById(signedInUser.user_id).then(({notification_count}) => {
            setNotificationCount(notification_count)
        })
    }, [checkNotifications])

    return (notificationCount == 0 ? children :
        <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        variant="dot"
        >
            {children}
        </StyledBadge>
    )
}

export default NotificationDot