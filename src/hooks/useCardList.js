
const useCardList = ( items, idFunc, imgFunc, descriptionFunc, styleName, onClick = (item)=>{}) => {
    let cardFeature
    switch (styleName){
        case "horizontal":
            cardFeature = {
                maxWidth : 350,
                contentWidth : 200,
                horizontal: true,
                onClick: (item)=>{onClick(item)}
            }
            break
        default:
            cardFeature = {
                maxWidth : 550,
                contentWidth : 380,
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

    return { cardItems, cardFeature };
};

export default useCardList;