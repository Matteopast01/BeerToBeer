import AdvancedSearch from "../components/AdvancedSearch";

const Search = function (){
    const filters = [
        {name: "ABV", min: "1", max:"50"},
        {name: "IBV", min: "1", max:"10"},
        {name: "SMR", min: "1", max:"10"}
    ];

    return (
        <div>
            <AdvancedSearch data={filters}/>
        </div>

    )
}
export default Search;
