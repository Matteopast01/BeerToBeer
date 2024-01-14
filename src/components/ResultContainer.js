import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";
import BeerCardDescription from "./BeerCardDescription";
import {useState} from "react";
import {useNavigate} from "react-router-dom";



export const ResultContainer = function(){

    const [items, setItems] = useState([])
    const navigate = useNavigate()

    const [cardItems, cardFeature] = useCardList(items,
        (item)=>{return item.id},
        (item)=>{return item.image_url},
        (item)=>{
            return <BeerCardDescription beer={item}/>
        },
        "default:350--8",
        (item)=>{navigate(`/product/${item.id}`)}
    )



    return (
        <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}/>
    )

}
