import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImagesUploader from "../components/ImagesUploader";

import {delete_img, get_docs_by_attribute, pull_img_url, push_img} from "../services/persistence_manager";

const AdminPage = () => {




    const updateSliderImages = async function (img) {
        console.log (img)


    }



    const updateDefaultUserImage = async function (img) {
        const queryResult = await get_docs_by_attribute("default_user_img", "Default_Images",  "type")
        const defaultUserImageLink = queryResult[0].link_img
        await delete_img(defaultUserImageLink)
        await push_img(defaultUserImageLink, img)
    }

    return (
        <div>
            <Header disableSearchBar/>
            <ImagesUploader props = {{type : "slider_img", uploadFunction: updateSliderImages}} maxImages={3} />
            <br />
            <ImagesUploader props = {{type :"default_user_img", uploadFunction : updateDefaultUserImage }} maxImages={1} />
            <Footer />
        </div>
    );
};

export default AdminPage;
