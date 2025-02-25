function formatDateAndTime(date){
    const today = new Date();
    const timeString = date.toString().split(" ")[4].split(":").slice(0,2).join(":")
    
    const secondsPassed = today.getTime() - date.getTime()

    if(secondsPassed < 86400){
        return `Today at ${timeString}`;
    }

    if(secondsPassed >= 86400 && secondsPassed < 172800){
        return `Yesterday at ${timeString}`
    }

    const dateStringParts = date.toISOString().split("T")[0].split("-")
    dateStringParts[0] = [dateStringParts[2], dateStringParts[2] = dateStringParts[0]][0]
    const dateString = dateStringParts.join("/")

    return `${dateString}, ${timeString}`
}

export default formatDateAndTime