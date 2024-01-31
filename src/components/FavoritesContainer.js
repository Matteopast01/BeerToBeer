import {useNavigate} from "react-router-dom";
import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";
import {useContext, useEffect, useState} from "react";
import {
    get_docs_by_attribute,
    requestBeersById } from "../services/persistence_manager.js";
import BeerCardDescription from "./BeerCardDescription";
import {AuthContext} from "../contexts/Auth";
import {useSelector} from "react-redux";

export function FavoritesContainer(){
    const [items, setItems] = useState([])
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    const render_favorite = useSelector((state) => state.favorite.rerender)

    useEffect(() => {
        (async  ()=> {
            await loadFavoritesBeers()
            console.log("prova Use Effect")
        })()
    }, [render_favorite]);

    const loadFavoritesBeers = async function () {

        const queryResult = await get_docs_by_attribute(currentUser.uid,
            "Favorites", "uid")
        const FavoriteBeers= []
        for (let doc of queryResult){
            let beer = await requestBeersById(doc.beer_id)
            FavoriteBeers.push(beer[0])
        }
        setItems(FavoriteBeers)
    }

    const [cardItems, cardFeature] = useCardList(items,
        (item)=>{return item.id},
        (item)=>{return item.image_url},
        (item)=>{return(
            <BeerCardDescription beer={item}/>
        ) },
        "default:350--181-8",
        (item)=>{navigate(`/product/${item.id}`)}
    )

    return (
            <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}/>
    )
}

export default FavoritesContainer;
