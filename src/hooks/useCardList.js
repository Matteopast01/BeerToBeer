
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
                maxWidth : 350,
                contentWidth : 200,
                horizontal: false,
                onClick: (item)=>{onClick(item)}
            }
            break
    }
    const itemsCard = items.map((item)=>{
        return {
            id: idFunc(item),
            img: imgFunc(item),
            description: descriptionFunc(item)
        }
    })

    return { itemsCard, cardFeature };
};

export default useCardList;