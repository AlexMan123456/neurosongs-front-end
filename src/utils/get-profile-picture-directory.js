function getProfilePictureDirectory(user){
    return user.profile_picture === "Default" ? "default-profile-picture.jpg" : `${user.user_id}/images/profile-picture/${user.profile_picture}`
}

export default getProfilePictureDirectory