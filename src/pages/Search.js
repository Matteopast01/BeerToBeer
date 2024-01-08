import AdvancedSearch from "../components/AdvancedSearch";
import Sorting from "../components/Sorting";
import {CardList} from "../components/CardList";
import useDropDown from "../hooks/useDropDown";
import * as React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Search = function (){
    //SLIDER
    const filters = [
        {name: "ABV", description:"Alcohol by volume (ABV) is a metric used to determine the alcohol content in an alcoholic beverage."},
        {name: "IBV", description:"International Bitterness Unit (IBU): Measures beer bitterness from hops."},
        {name: "SMR", description:"Standard Reference Method (SRM): Quantifies beer color by measuring light absorbance."}
    ];
    //DROPDOWN
    const {selection, handleSelect,options} = useDropDown(null, [
        {label: "-", value: "-"},
        {label: "Alphabetical", value: "alphabetical"},
        {label: "IBV", value: "ibv"},
        {label: "Number of like", value: "number of like"},
    ]);
    const { selection: secondSelection, handleSelect: handleSecondSelect,
        options: secondOptions } = useDropDown(null, [
        { label: "Crescente", value: "crescente" },
        { label: "Descrescente", value: "descrescente" },
    ]);

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
        <div>
            <div>
                <Header/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: '20px' }}>
                    <AdvancedSearch data={filters} />
                    <div className="box has-text-centered mb-3">
                        <h5 className="title is-4">Sorting</h5>
                        <Sorting
                            options={options}
                            selection={selection}
                            handleSelect={handleSelect}
                        />
                        <Sorting
                            options={secondOptions}
                            selection={secondSelection}
                            handleSelect={handleSecondSelect}
                        />
                    </div>
                </div>
                <div>
                    <CardList maxColumn={3} cardFeature={cardFeature} items={items}/>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Search;
