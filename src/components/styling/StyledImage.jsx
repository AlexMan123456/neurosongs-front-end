function StyledImage({src, alt}){
    return <img 
        style={{
            width: "15vw",
            height: "auto"
        }}
        src={src}
        alt={alt}
    />
}

export default StyledImage