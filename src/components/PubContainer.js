import {load_ordered_docs, pull_img_url, query_by_preamble} from "../services/persistence_manager";
import {useDispatch, useSelector} from "react-redux";
import {addPub, pubSelected} from "../store/App";
import * as React from "react";
import {useEffect} from "react";
import useCardList from "../hooks/useCardList";
import {CardList} from "./CardList";

function PubContainer(){

    const dispatch = useDispatch()

    const searchedPub = useSelector((state)=> state.searchTerm.value)

    useEffect(() => {
        (async  ()=> {
            const pubsObjects = await load_pubs()

            const emptyArray = []
             for (let pub of pubsObjects){
                 emptyArray.push({...pub,
                     img: await pull_img_url(pub.link_img)})
          }
            dispatch(addPub(emptyArray))
        })()
    }, [searchedPub]);

    const load_pubs = async function (){
        const pubs = searchedPub === ""
            ? await load_ordered_docs("Pub", "name","asc", 9)
            : await query_by_preamble(
                "Pub",
                "name",
                searchedPub.charAt(0).toUpperCase() + searchedPub.slice(1).toLowerCase(),
                200,
                true,
                "number_calls"
            );

        pubs.forEach((pub,index) => {
            const {position, ...newObj} = pub;
            pubs[index] = {
                ...newObj,
                lat: pub.position._lat,
                lng: pub.position._long
            };
            }
        )
        return pubs
    }

    const pubs = useSelector(state => state.loadedPubs.pubs)

    const handleOnclick = function (item){

        const id = item.id
        const pub = pubs.find((pub) => pub.id === id);
        dispatch(pubSelected(pub))
    }

    const [cardItems, cardFeature] = useCardList(pubs,
        (item)=>{
            return item.id},
         (item) => {
            return item.img
        },
        (item)=>{
            return (<div><h1 style = {{fontWeight: "bold"}} className="has-text-centered"> {item.name}</h1> {item.description} </div>
        )
        },
        "default:273--6",
        (item)=>{handleOnclick(item)}
    )

    return (
        <div style={{textAlign: "left", overflow: "auto", height:"90vh"}}>
            <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}/>
        </div>
    );
}

export default PubContainer;
