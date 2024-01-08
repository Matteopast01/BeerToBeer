import React, {Component} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typography from "@mui/material/Typography";

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000 // Imposta la velocità di autoplay in millisecondi (ad esempio, 2000 ms = 2 secondi)
        };
        return (
            <div style={{margin: "auto", width:"100%"}}>
                <Slider style={{margin: "auto", width:"95%"}} {...settings}>
                    <cd>
                        <img style={{display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "80%"}} src="https://glacier-design.com/wp-content/uploads/2022/10/Can-you-hydrate-yourself-with-beer-2048x1365.jpg" alt="Img1" />
                        <h1 style={{position: "sticky", bottom: "50%", textAlign: "center", fontSize: 30, color: "white"}}>
                            Imagine 1
                        </h1>
                    </cd>
                    <cd>
                        <img style={{display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "80%"}} src="https://glacier-design.com/wp-content/uploads/2022/10/Can-you-hydrate-yourself-with-beer-2048x1365.jpg" alt="Img2" />
                        <h1 style={{position: "sticky", bottom: "50%", textAlign: "center", fontSize: 30, color: "white"}}>
                            Imagine 2
                        </h1>
                    </cd>
                    <cd>
                        <img style={{display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "80%"}} src="https://glacier-design.com/wp-content/uploads/2022/10/Can-you-hydrate-yourself-with-beer-2048x1365.jpg" alt="Img3" />
                        <h1 style={{position: "sticky", bottom: "50%", textAlign: "center", fontSize: 30, color: "white"}}>
                            Imagine 3
                        </h1>
                    </cd>
                </Slider>
            </div>
        );
    }
}
