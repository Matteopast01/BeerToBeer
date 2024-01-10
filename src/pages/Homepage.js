import {BeerContainer} from "../components/BeerContainer";
import SimpleSlider from "../components/Slider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useEffect, useState} from "react";
import {pull_img_url} from "../services/persistence_manager";

function Homepage(){
    const [images, setImages] = useState([]);

    useEffect(()=>{
        (async  ()=> {
            const items = []
            for(let img of ["slider-1.jpeg", "slider-2.jpeg", "slider-3.jpeg"]){
                items.push(await pull_img_url(img))
            }
            setImages(items)
        })()

        return ()=>{setImages([])}
    }, [])


    return (
        <div>
            <div>
                <Header/>
            </div>
            <br/>
            <div>
                <SimpleSlider imags={!!images ? [{img:images[0], text: "image 1"},
                                        {img:images[1], text:"image 2"},
                                        {img:images[2], text:"image 3"}]: []}/>
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