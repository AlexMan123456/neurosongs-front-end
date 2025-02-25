function getRatingColour(rating){
    return rating < 4.5 ? "error" : (rating < 7 ? "warning" : "success")
}

export default getRatingColour