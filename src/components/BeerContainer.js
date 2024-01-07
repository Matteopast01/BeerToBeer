import {useNavigate} from "react-router-dom";
import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";
import DropDown from "./DropDown";
import useDropDown from "../hooks/useDropDown";
import * as React from "react";
import {useEffect, useState} from "react";
import {load_ordered, requestBeersById} from "../services/persistence_manager.js";

export function BeerContainer(){
    const [selection, setSelection] = useState({label: "Più viste", value: "Più visti"});
    const [items, setItems] = useState([])

    useEffect(async () => {
        setItems(await getBeers())
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
        let arrayOfId = await load_ordered("Beer_Id", "number_calls", "desc", 6)
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
            (item)=>{return <h2 style={{ textAlign: "center"}}> {item.name}</h2>},
            "default:350-500",
            (item)=>{navigate("/login")}
            )

    return (
        <div>
            <br/>
            <div style={{margin: "auto", width:"10%"}}>
                <DropDown options={options} value={selection} onChange={handleSelect} />
            </div>
            <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}></CardList>
        </div>

    )
}
