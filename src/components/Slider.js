import React, {Component, useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {pull_img_url} from "../services/persistence_manager";

export default function SimpleSlider({imags}) {
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
            <div style={{margin: "auto", width:"100%"}}>
                <Slider style={{margin: "auto", width:"95%"}} {...settings}>
                    {imags.map((img)=>{
                        return (
                            <cd>
                                <img style={{display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    width: "80%"}} src={img.img} alt="Img1" />
                                <h1 style={{position: "sticky", bottom: "50%", textAlign: "center", fontSize: 30, color: "white"}}>
                                    {img.text}
                                </h1>
                            </cd>
                        )
                    })}
                </Slider>
            </div>
        );
}