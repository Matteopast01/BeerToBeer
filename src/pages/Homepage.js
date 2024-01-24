import {BeerContainer} from "../components/BeerContainer";
import SimpleSlider from "../components/SimpleSlider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {pull_img_url} from "../services/persistence_manager";
import useAsync from "../hooks/useAsync";
import {get_docs_by_attribute} from "../services/persistence_manager";

function Homepage() {

    let images = useAsync(async  ()=> {
        const items = [];
         const queryResult = await get_docs_by_attribute("slider_img", "Default_Images", "type")

        for (let doc of queryResult){
            items.push({img: await pull_img_url(doc.link_img), text: doc.text})
        }
        return items;
    });

    return (
        <div>
             <Header/>
            <br/>
            <div style={{marginTop: "10px"}}>
                <SimpleSlider imags={!!images ? images: []}/>
                <br/>
                <BeerContainer/>
            </div>
            <Footer/>
        </div>
    )
}

export default Homepage;