import {useNavigate} from "react-router-dom";
import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";
import * as React from "react";
import {useEffect, useState} from "react";
import {load_ordered_docs, requestBeersById} from "../services/persistence_manager.js";
import BeerCardDescription from "./BeerCardDescription";

export function FavoritesContainer(){
    const [items, setItems] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        (async  ()=> {
            setItems(await getFavorites())
        })()
        return ()=>{
            setItems([])
        }
    }, []);


//TODO recuperare la lista di birre preferite dell'utente
    const getFavorites = async function () {
        let arrayOfId = await load_ordered_docs("Beer_Id", "number_calls", "desc", 6)
        let beers = []
        for (let obj of arrayOfId) {
            let beer = await requestBeersById(obj.id)
            beers.push(beer[0])
        }
        return beers
    }

    const [cardItems, cardFeature] = useCardList(items,
        (item)=>{return item.id},
        (item)=>{return item.image_url},
        (item)=>{return(
            <BeerCardDescription beer={item}/>
        ) },
        "default:350--8",
        (item)=>{navigate(`/product/${item.id}`)}
    )

    return (
        <div>
            <br/>
            <div style={{margin: "auto", width:"10%", display: "flex", justifyContent: "center" }}>
            </div>
            <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}/>
        </div>
    )
}

export default FavoritesContainer;
