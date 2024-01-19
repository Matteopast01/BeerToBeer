import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider({imags}) {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000
        };

        return (
            <div style={{marginLeft: "0px", marginRight: "0px", width:"100%"}}>
                <Slider style={{marginLeft: "0px", marginRight: "0px", width:"100%"}} {...settings}>
                    {imags.map((img, index)=>{
                        return (
                            <div key={index}>
                                <img style={{display: "block",
                                    marginLeft: "0px",
                                    marginRight: "0px",
                                    width: "1920px",
                                    height: "550px",
                                    objectFit: "cover", }} src={img.img} alt="Img1" />
                                <h1 style={{position: "sticky", bottom: "50%", textAlign: "center", fontSize: 30, color: "white"}}>
                                    {img.text}
                                </h1>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        );
}
