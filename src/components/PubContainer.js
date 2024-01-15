
import {load_ordered_docs, pull_img_url} from "../services/persistence_manager";
import {useDispatch} from "react-redux";
import {addPub} from "../store/App";
import {useEffect, useState} from "react";
import useCardList from "../hooks/useCardList";
import BeerCardDescription from "./BeerCardDescription";
import {CardList} from "./CardList";


function PubContainer(){
    const [pubs, setPubs] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        (async  ()=> {
            setPubs(await load_pubs())
        })()

    }, []);




    const load_pubs = async function (){
        const pubs =  await load_ordered_docs("Pub", "name")
        pubs.forEach((beer)=>dispatch(addPub(beer)))
        return pubs
    }

    const handleOnClick = function (item){

        console.log("ciao")

    }


    const [cardItems, cardFeature] = useCardList(pubs,
        (item)=>{return item.id},
        async (item) => {
            return await pull_img_url(item.link_img)
        },
        (item)=>{
            return item.description
        },
        "default:350--8",
        (item)=>{handleOnClick(item)}
    )

        // const dispatch = useDispatch()
        // TODO: ogni card deve avere un onClick = dispatch(pubSelected({pub}))
    return (
        <div style={{textAlign: "center"}} >
            <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}/>
        </div>
    );
}

export default PubContainer;