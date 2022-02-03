export const RandomColor = (arrColor)=> {
        return  arrColor[Math.floor(Math.random() * arrColor.length)];
}
export const IdGenerator = () => {
    return '_' + Math.random().toString(36).substr(2, 9)
}




