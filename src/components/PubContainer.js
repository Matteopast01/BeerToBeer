
import {load_ordered_docs, pull_img_url} from "../services/persistence_manager";
import {useDispatch} from "react-redux";
import {addPub, pubSelected} from "../store/App";
import {useEffect, useState} from "react";
import useCardList from "../hooks/useCardList";
import BeerCardDescription from "./BeerCardDescription";
import {CardList} from "./CardList";
import * as React from "react";


function PubContainer(){
    const [pubs, setPubs] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        (async  ()=> {
            const pubsObjects = await load_pubs()
            const emptyArray = []
             for (let pub of pubsObjects){
                 emptyArray.push({...pub,
                     img: await pull_img_url(pub.link_img)})

          }
             setPubs(emptyArray)

        })()

    }, []);




    const load_pubs = async function (){
        const pubs =  await load_ordered_docs("Pub", "name")
        pubs.forEach((pub)=>{
            const { position, ...newObj } = pub;
            const serializablePub = {
                ...newObj,
                lat: pub.position._lat,
                lng: pub.position._long
            }
            dispatch(addPub(serializablePub))}
        )
        return pubs
    }

    const handleOnclick = function (item){

        const id = item.id
        const pub =  pubs.find((pub) => pub.id === id);
        const { position, ...newObj } = pub;
        const serializablePub = {
            ...newObj,
            lat: pub.position._lat,
            lng: pub.position._long
        }

        dispatch(pubSelected(serializablePub))



    }



    const [cardItems, cardFeature] = useCardList(pubs,
        (item)=>{
            return item.id},
         (item) => {
            return item.img
        },
        (item)=>{
            return (<div><h1 style = {{fontWeight: "bold"}}className="has-text-centered"> {item.name}</h1> {item.description} </div>

        )
        },
        "default:290--6",
        (item)=>{ handleOnclick(item)
        }
    )


        // TODO: ogni card deve avere un onClick = dispatch(pubSelected({pub}))
    return (
        <div style={{textAlign: "center", overflow: "auto", height:"100vh"}} >
            <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}/>
        </div>
    );
}

export default PubContainer;