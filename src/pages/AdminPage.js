import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImagesUploader from "../components/ImagesUploader";
import {
    delete_img,
    get_docs_by_attribute,
    pull_img_url,
    push_img,
    update_by_function
} from "../services/persistence_manager";

const AdminPage = () => {

    const [sliderImages, setSliderImages] = useState([])
    const [position, setPosition] = useState(-1)

    useEffect(() => {
        (async  ()=> {

            const items = [];
            const queryResult = await get_docs_by_attribute(
                "slider_img", "Default_Images", "type")

            for (let doc of queryResult){
                items.push({img: await pull_img_url(doc.link_img), number: doc.id})
            }
            setSliderImages(items)
        })()
    }, []);

    const updateSliderImages = async function (img) {
        const queryResult = await get_docs_by_attribute(position, "Default_Images", "id")
        const link = queryResult[0].link_img
        await delete_img(link)
        const new_link = "slider-" + (position-1).toString()
        await push_img(new_link, img)
        await update_by_function(
            "Default_Images", "id", position, (entry) => {
            entry.link_img = new_link
            return entry
        })
    }

    const removePopupImage = async function (param ){

        const removedSlider = sliderImages.find(slider => slider.img === param);
        if (removedSlider !== undefined) {
            setPosition(removedSlider.number);
        }

       const newArray = sliderImages.filter((slider)=>
            slider.img !==  param
        )
        setSliderImages(newArray)
    }

    const updateDefaultUserImage = async function (img) {
        const queryResult = await get_docs_by_attribute(
            "default_user_img", "Default_Images",  "type")
        const defaultUserImageLink = queryResult[0].link_img
        await delete_img(defaultUserImageLink)
        await push_img(defaultUserImageLink, img)
    }

    return (
        <div>
            <Header disableSearchBar/>
            <ImagesUploader props = {{type : "slider_img", uploadFunction: updateSliderImages,
                removePopupImage: removePopupImage}} text={"Change slider images on the home page:"}
                            maxImages={3}  minImages={2}/>
            <br />
            <ImagesUploader props = {{type :"default_user_img", uploadFunction : updateDefaultUserImage }}
                            text={"Change user default images:"} maxImages={1} minImages={0}/>
            <Footer />
        </div>
    );
};

export default AdminPage;
