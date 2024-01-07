import {useNavigate} from "react-router-dom";
import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";
import DropDown from "./DropDown";
import useDropDown from "../hooks/useDropDown";
import * as React from "react";

export function BeerContainer(){
    let items = Array.from({ length: 8 },
        (_, i) => {
            return {id: i,
                img: "https://bulma.io/images/placeholders/96x96.png"
            }});

    const navigate = useNavigate();
    const [cardItems, cardFeature] = useCardList(items,
            (item)=>{return item.id},
            (item)=>{return item.img},
            (item)=>{return <p> prova testo {item.id}</p>},
            "default:350-500",
            (item)=>{navigate("/login")}
            )

    const {selection, handleSelect,options} = useDropDown({label: "Più viste", value: "Più visti"}, [
        {label: "Più viste", value: "Più visti"},
        {label: "Più apprezzate", value: "Più apprezzate"},
    ]);

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
