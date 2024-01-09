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
            <br/>
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