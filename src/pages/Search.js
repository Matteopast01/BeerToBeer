import AdvancedSearch from "../components/AdvancedSearch";
import {CardList} from "../components/CardList";

const Search = function (){
    //SLIDER
    const filters = [
        {name: "ABV", min: "1", max:"50", description:"Alcohol by volume (ABV) is a metric used to determine the alcohol content in an alcoholic beverage."},
        {name: "IBV", min: "1", max:"10",description:"International Bitterness Unit (IBU): Measures beer bitterness from hops."},
        {name: "SMR", min: "1", max:"10",description:"Standard Reference Method (SRM): Quantifies beer color by measuring light absorbance."}
    ];

    //CARDLIST
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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: '20px' }}>
                <AdvancedSearch data={filters} />
            </div>
            <div>
                <CardList maxColumn={3} cardFeature={cardFeature} items={items}></CardList>
            </div>
        </div>
    )
}

export default Search;
