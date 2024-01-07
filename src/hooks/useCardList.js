
const useCardList = ( items, idFunc, imgFunc, descriptionFunc, styleName, onClick = (item)=>{}) => {
    let maxWidth = "100%"
    let contentDimension = "100%"
    if(styleName.includes(":")){
        const splitted = styleName.split(":")
        if(styleName.includes("-") ){
            const widthSplitted = splitted[1].split("-")
            maxWidth = parseInt(widthSplitted[0])
            contentDimension = parseInt(widthSplitted[1])
        }
        maxWidth = parseInt(splitted[1])
        styleName = splitted[0]
    }
    let cardFeature
    switch (styleName){
        case "horizontal":
            cardFeature = {
                maxWidth : maxWidth,
                contentWidth : contentDimension,
                horizontal: true,
                onClick: (item)=>{onClick(item)}
            }
            break
        default:
            cardFeature = {
                maxWidth : maxWidth,
                contentWidth : contentDimension,
                horizontal: false,
                onClick: (item)=>{onClick(item)}
            }
            break
    }
    const cardItems = items.map((item)=>{
        return {
            id: idFunc(item),
            img: imgFunc(item),
            description: descriptionFunc(item)
        }
    })

    return [ cardItems, cardFeature ];
};

export default useCardList;