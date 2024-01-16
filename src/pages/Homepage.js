import {BeerContainer} from "../components/BeerContainer";
import SimpleSlider from "../components/Slider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {pull_img_url} from "../services/persistence_manager";
import useAsync from "../hooks/useAsync";

function Homepage(){

    let images = useAsync(async  ()=> {
        const items = []
        const text =  ["Life's too short \n to drink bad beer.", "In a world of choices, choose beer.", "Save water,  drink beer."]
        const images = ["slider-1.jpeg", "slider-2.jpeg", "slider-3.jpeg"]

        for(let i = 0; i <text.length; i++ ){
            items.push({img: await pull_img_url(images[i]), text: text[i]})
        }
        return items
    })

    return (
        <div >
            <Header/>
            <br/>
            <div>
                <SimpleSlider imags={!!images ? images: []}/>
                <br/>
                <BeerContainer/>
            </div>
            <Footer/>
        </div>
    )
}

export default Homepage;
