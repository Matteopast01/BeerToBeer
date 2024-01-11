import {BeerContainer} from "../components/BeerContainer";
import SimpleSlider from "../components/Slider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useEffect, useState} from "react";
import {pull_img_url} from "../services/persistence_manager";
import useAsync from "../hooks/useAsync";

function Homepage(){
    let images = useAsync(async  ()=> {
        const items = []
        for(let img of ["slider-1.jpeg", "slider-2.jpeg", "slider-3.jpeg"]){
            items.push({img: await pull_img_url(img), text: "image"})
        }
        return items
    })


    return (
        <div>
            <div>
                <Header/>
            </div>
            <br/>
            <div>
                <SimpleSlider imags={!!images ? images: []}/>
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