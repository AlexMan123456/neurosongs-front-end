function formatDate(date){
    const dateStringParts = date.toDateString().split(" ").slice(1,4);
    dateStringParts[0] = [dateStringParts[1], dateStringParts[1] = dateStringParts[0]][0];
    return dateStringParts.join(" ")
}

export default formatDate