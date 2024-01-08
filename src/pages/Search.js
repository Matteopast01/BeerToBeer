import AdvancedSearch from "../components/AdvancedSearch";
import Sorting from "../components/Sorting";
import {CardList} from "../components/CardList";
import * as React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Search = function (){
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
                    <AdvancedSearch/>
                    <div className="box has-text-centered mb-3">
                        <h5 className="title is-4">Sorting</h5>
                        <Sorting/>
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
