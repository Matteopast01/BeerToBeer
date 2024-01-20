import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImagesUploader from "../components/ImagesUploader";

import {push_img} from "../services/persistence_manager";

const AdminPage = () => {
    //TODO aggiornare le foto relative allo slider ed aggiornare la foto di default degli utenti

    const updateSliderImages = async function () {
        const image = "photo"
        //upload a file in the storage with that path
        await push_img("slider-1.jpeg", image)


    }

    const updateDefaultUserImage = async function () {
        const image = "photo"
        //upload a file in the storage with that path
        await push_img("user-img.webp", image)


    }

    return (
        <div>
            <Header />
            <ImagesUploader type = {"slider_img"} maxImages={3} />
            <br />
            <ImagesUploader type = {"default_user_img"} maxImages={1} />
            <Footer />
        </div>
    );
};

export default AdminPage;
