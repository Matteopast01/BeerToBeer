
const useCardList = ( items, idFunc, imgFunc, descriptionFunc, styleName, onClick = (item)=>{}) => {
    let maxWidth = "100%"
    let contentWidth = "auto"
    let contentHeight = "auto"
    let numberContentRow = "100%"
    if(styleName.includes(":")){
        const splitted = styleName.split(":")
        if(styleName.includes("-") ){
            const widthSplitted = splitted[1].split("-")
            maxWidth = !!widthSplitted[0] ? parseInt(widthSplitted[0]): "100%"
            contentWidth = !!widthSplitted[1] ? parseInt(widthSplitted[1]): "auto"
            contentHeight = !!widthSplitted[2] ? parseInt(widthSplitted[2]): "auto"
            numberContentRow = !!widthSplitted[2] ?parseInt(widthSplitted[3]): "auto"
        }
        maxWidth = parseInt(splitted[1])
        styleName = splitted[0]
    }
    let cardFeature
    switch (styleName){
        case "horizontal":
            cardFeature = {
                maxWidth : maxWidth,
                contentStyle : {width: contentWidth, height: contentHeight},
                numberContentRow: numberContentRow,
                horizontal: true,
                onClick: (item)=>{onClick(item)}
            }
            break
        default:
            cardFeature = {
                maxWidth : maxWidth,
                contentStyle : {width: contentWidth, height: contentHeight},
                numberContentRow : numberContentRow,
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