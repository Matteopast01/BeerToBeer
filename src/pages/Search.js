import AdvancedSearch from "../components/AdvancedSearch";
import {CardList} from "../components/CardList";

const Search = function (){
    //SLIDER
    const filters = [
        {name: "ABV", min: "1", max:"50", description:"Alcohol by volume (ABV) is a metric used to determine the alcohol content in an alcoholic beverage."},
        {name: "IBV", min: "1", max:"10",description:"International Bitterness Unit (IBU): Measures beer bitterness from hops."},
        {name: "SMR", min: "1", max:"10",description:"Standard Reference Method (SRM): Quantifies beer color by measuring light absorbance."}
    ];


    return (
        <div>
            <AdvancedSearch data={filters}/>
        </div>

    )
}
export default Search;
