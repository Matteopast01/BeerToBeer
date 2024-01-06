import BeerCard from "../components/BeerCard";
import {CardList} from "../components/CardList"

const Homepage = function (){
    const cardFeature = {
        maxWidth : 350,
        contentWidth : 200,
        horizontal: false,
        onClick: (item)=>{console.log(item.id)}
    }

    let items = Array.from({ length: 8 },
        (_, i) => {
        return {id: i,
                img: "https://bulma.io/images/placeholders/96x96.png",
                description: (item)=>{
                    return <p>prova testo {item.id}</p>
                }}
        });


    return (
        <CardList maxColumn={3} cardFeature={cardFeature} items={items}></CardList>
    )


}

export default Homepage;