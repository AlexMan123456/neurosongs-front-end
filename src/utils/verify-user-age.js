function verifyUserAge(dateOfBirth, minimumAge){
    const today = new Date()
    const ageBasedOnYear = today.getFullYear() - dateOfBirth.getFullYear();
    if(ageBasedOnYear < minimumAge){
        return false;
    }
    if(ageBasedOnYear === minimumAge){
        console.log(today.getMonth(), dateOfBirth.getMonth())
        if(today.getMonth() < dateOfBirth.getMonth()){
            return false;
        }
        if(today.getDay() < dateOfBirth.getDay()){
            return false;
        }
    }
    return true;
}

export default verifyUserAge