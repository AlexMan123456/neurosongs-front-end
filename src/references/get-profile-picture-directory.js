function getProfilePictureDirectory({profile_picture, user_id}){
    return profile_picture === "Default" ? "default-profile-picture.jpg" : `${user_id}/images/profile-picture/${profile_picture}`
}

export default getProfilePictureDirectory