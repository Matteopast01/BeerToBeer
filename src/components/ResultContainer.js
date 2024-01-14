import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";
import BeerCardDescription from "./BeerCardDescription";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import useAsync from "../hooks/useAsync";




export const ResultContainer = function(){



    const [items, setItems] = useState([])
    const navigate = useNavigate()

    const values = useSelector((state)=>state.filters.values)
    const selection1 = useSelector((state) => state.sorting.selection1)
    const selection2 = useSelector((state) => state.sorting.selection2)







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
