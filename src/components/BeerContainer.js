import {useNavigate} from "react-router-dom";
import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";
import DropDown from "./DropDown";
import * as React from "react";
import {useEffect, useState} from "react";
import {load_ordered_docs, requestBeersById, store_doc, load_docs_by_attributes, delete_doc} from "../services/persistence_manager.js";
import BeerCardDescription from "./BeerCardDescription";

export function BeerContainer(){
    const [selection, setSelection] = useState({label: "Più viste", value: "Più visti"});
    const [items, setItems] = useState([])

    useEffect(() => {
        (async  ()=> {
            setItems(await getBeers())
        })()
        return ()=>{
            setItems([])
        }
    }, []);


    const options = [
        {label: "Più viste", value: "Più visti"},
        {label: "Più apprezzate", value: "Più apprezzate"}
    ]

    const handleSelect = async (option) => {
        setItems(await getBeers())
        setSelection(option);
    };

    const getBeers = async function () {
        let arrayOfId = await load_ordered_docs("Beer_Id", "number_calls", "desc", 6)
        let beers = []
        for (let obj of arrayOfId) {
            let beer = await requestBeersById(obj.id)
            beers.push(beer[0])
        }
        return beers
    }

    const navigate = useNavigate();
    const [cardItems, cardFeature] = useCardList(items,
            (item)=>{return item.id},
            (item)=>{return item.image_url},
            (item)=>{
                return <BeerCardDescription beer={item}/>
                 },
            "default:350--8",
            (item)=>{navigate("/login")}
            )

    return (
        <div>
            <br/>
            <div style={{margin: "auto", width:"10%", display: "flex", justifyContent: "center" }}>
                <DropDown options={options} value={selection} onChange={handleSelect} />
            </div>
            <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}></CardList>
        </div>
    )
}
