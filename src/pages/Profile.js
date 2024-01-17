import Header from "../components/Header";
import * as React from "react";
import Footer from "../components/Footer";
import FavoritesContainer from "../components/FavoritesContainer"
import CustomCard from "../components/CustomCard";
import Popup from "../components/Popup";

import { AuthContext } from "../contexts/Auth";
import {useContext, useEffect, useState} from "react";

import {count_docs, get_docs_by_attribute} from "../services/persistence_manager";
import {pull_img_url} from "../services/persistence_manager";
const Profile = function (){

    const {currentUser} = useContext(AuthContext);

    const [currentUserImage, setCurrentUserImage] = useState(null)


    //TODO: recuperare la foto profilo username e n. recensioni
    const provideUserInformation = async function () {

        const id_user = currentUser.uid
        let number_reviews = await count_docs(id_user,"Review","uid_author")
        console.log ("number_reviews: " + number_reviews)
        const user = await get_docs_by_attribute(id_user, "User", "uid")
        const username = user[0].username
        console.log ("username" + username)
        const link_img = user[0].link_img
        console.log (link_img)

       const img =  !!link_img ?  await pull_img_url("link_img") : await pull_img_url("user-img.webp")
        console.log ("img"+ img)

        setCurrentUserImage(img)
    }



    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <CustomCard
                        horizontal={false}
                        maxWidth="300px"
                        contentWidth="100%"
                        numberContentRow="12"
                        img="https://thumbs.dreamstime.com/z/birra-bevente-dell-uomo-avido-25256367.jpg?w=576"
                        onClick={null}
                        children={
                            <>
                                <div style={{ textAlign: 'center' }}>
                                    Username
                                    <br />
                                    Number of reviews
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                <Popup currentImage={currentUserImage}/>
                                </div>
                            </>
                        }/>
                </div>
                <div>
                    <div style={{flex: '1', textAlign: 'center', fontSize: '28px', fontFamily: 'Arial, sans-serif'}}>
                        <b>Favorites </b>
                    </div>
                    <FavoritesContainer />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;
