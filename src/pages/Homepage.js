import BeerCard from "../components/BeerCard";
import {CardList} from "../components/CardList"
import {useNavigate} from "react-router-dom";
import {BeerContainer} from "../components/BeerContainer";
import SimpleSlider from "../components/Slider";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Homepage = function (){
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <SimpleSlider/>
            </div>
            <br/>
            <div>
                <BeerContainer/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Homepage;
