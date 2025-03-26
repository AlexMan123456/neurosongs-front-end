function turnFileIntoBase64URL(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        }
        reader.onerror = (err) => {
            reject(err)
        }
    })
}

export default turnFileIntoBase64URL