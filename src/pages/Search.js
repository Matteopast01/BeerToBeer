import AdvancedSearch from "../components/AdvancedSearch";
import DropDown from "../components/DropDown";
import {useState} from "react";

const Search = function (){
    //SLIDER
    const filters = [
        {name: "ABV", min: "1", max:"50", description:"Alcohol by volume (ABV) is a metric used to determine the alcohol content in an alcoholic beverage."},
        {name: "IBV", min: "1", max:"10",description:"International Bitterness Unit (IBU): Measures beer bitterness from hops."},
        {name: "SMR", min: "1", max:"10",description:"Standard Reference Method (SRM): Quantifies beer color by measuring light absorbance."}
    ];

    //DROPDOWN
    const [selection, setSelection] = useState(null);

    const handleSelect = (option) => {
        setSelection(option);
    };

    const options = [
        {label: "Red", value: "red"},
        {label: "Green", value: "green"},
        {label: "Blue", value: "blue"},
    ];

    return (
        <div>
            <AdvancedSearch data={filters}/>
            <DropDown options={options} value={selection} onChange={handleSelect} />
        </div>

    )
}
export default Search;
