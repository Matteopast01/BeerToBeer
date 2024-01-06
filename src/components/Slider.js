import React, {Component} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000 // Imposta la velocità di autoplay in millisecondi (ad esempio, 2000 ms = 2 secondi)
        };
        return (
            <div>
                <Slider {...settings}>
                    <div>
                        <h3>
                            <a href="https://via.placeholder.com/600x400" target="_blank" rel="noopener noreferrer">
                                <img src="https://via.placeholder.com/1200x400" alt="Image 1" />
                            </a>
                        </h3>
                    </div>
                    <div>
                        <h3>
                            <a href="https://via.placeholder.com/600x400" target="_blank" rel="noopener noreferrer">
                                <img src="https://via.placeholder.com/1200x400" alt="Image 1" />
                            </a>
                        </h3>
                    </div>
                    <div>
                        <h3>
                            <a href="https://via.placeholder.com/600x400" target="_blank" rel="noopener noreferrer">
                                <img src="https://via.placeholder.com/1200x400" alt="Image 1" />
                            </a>
                        </h3>
                    </div>
                </Slider>
            </div>
        );
    }
}
