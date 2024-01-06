import {useNavigate} from "react-router-dom";
import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";

export function BeerContainer(){
    let items = Array.from({ length: 8 },
        (_, i) => {
            return {id: i,
                img: "https://bulma.io/images/placeholders/96x96.png"
            }});

    const navigate = useNavigate();
    const {cardItems, cardFeature} = useCardList(items,
            (item)=>{return item.id},
            (item)=>{return item.img},
            (item)=>{return <p>prova testo {item.id}</p>},
            "default",
            (item)=>{navigate("/login")}
            )

    return (
        <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}></CardList>
    )
}
