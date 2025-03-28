function formatMarkdownWithLineBreaks(markdownString){
    return markdownString.split("\n").map((line) => {
        return line + "  \n"
    }).join("");
}

export default formatMarkdownWithLineBreaks