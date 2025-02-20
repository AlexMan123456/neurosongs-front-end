function getMissingPasswordRequirements(message){
    const requirements = message.slice(message.indexOf("[")+1, message.indexOf("]"));
    return requirements.split(", ")
}

export default getMissingPasswordRequirements