function formatGoogleDisplayNameAsUsername(displayName){
    return [...displayName].filter((character) => {
        return character !== " ";
    }).map((character) => {
        return character === "@" ? "a" : character;
    }).join("");
}

export default formatGoogleDisplayNameAsUsername