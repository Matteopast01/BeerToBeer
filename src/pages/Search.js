import AdvancedSearch from "../components/AdvancedSearch";
import Sorting from "../components/Sorting";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {ResultContainer} from "../components/ResultContainer";

const Search = function (){

    return (
        <div>
            <div>
                <Header/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: '20px' }}>
                    <AdvancedSearch/>
                    <div className="box has-text-centered mb-3">
                        <h5 className="title is-4">Sorting by</h5>
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
        </div>
    )
}

export default Search;