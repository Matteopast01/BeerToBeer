import AdvancedSearch from "../components/AdvancedSearch";
import Sorting from "../components/Sorting";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {ResultContainer} from "../components/ResultContainer";

const Search = function () {

    return (
        <>
            <div>
                <Header advancedSearch/>
                <br/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px' }}>
                <div style={{ marginRight: '20px', marginTop: '10px'}}>
                    <AdvancedSearch/>
                    <div className="box has-text-centered mb-3">
                        <h5 className="title is-4">Sorting by:</h5>
                        <Sorting/>
                    </div>
                </div>
                <div style={{margin:'auto'}}>
                    <ResultContainer/>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}

export default Search;