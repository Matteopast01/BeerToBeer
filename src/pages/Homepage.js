import BeerCard from "../components/BeerCard";
import {CardList} from "../components/CardList"
import {useNavigate} from "react-router-dom";
import {BeerContainer} from "../components/BeerContainer";
import SimpleSlider from "../components/Slider";
const Homepage = function (){
    return (
        <div>
            <div>
                <SimpleSlider/>
            </div>
            <br/>
            <div>
                <BeerContainer/>
            </div>
        </div>
        )
}

export default Homepage;
