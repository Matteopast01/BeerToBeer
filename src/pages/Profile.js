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
import {setSearchedBeers} from "../store/App";
const Profile = function (){

    const {currentUser} = useContext(AuthContext);

    const [currentUserImage, setCurrentUserImage] = useState(null)
    const [username, setUsername] = useState("")
    const [numberRew, setNumberRew] = useState(0)


    const provideUserInformation = async function () {

        const result = {}

        const id_user = currentUser.uid
        let number_reviews = await count_docs(id_user,"Review","uid_author")

        result["number_rew"] = number_reviews


        console.log ("number_reviews: " + number_reviews)
        const user = await get_docs_by_attribute(id_user, "User", "uid")
        const defaultImage = await get_docs_by_attribute("default_user_img", "Default_Images", "type")
        console.log(defaultImage)
        const username = user[0].username
        result["username"] = username

        console.log ("username" + username)
        const link_img = user[0].link_img
        console.log (link_img)

       const img =  !!link_img ?  await pull_img_url("link_img") : await pull_img_url(defaultImage[0].link_img)
        console.log ("img"+ img)
        result["img"] = img

        return result
    }


    useEffect(() => {
        (async  ()=> {

            const result =  await provideUserInformation()

            setUsername(result.username)
            setNumberRew(result.number_rew)
            setCurrentUserImage(result.img)
        })()
    }, []);





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
                        img={currentUserImage}
                        onClick={null}
                        children={
                            <>
                                <div style={{ textAlign: 'center' }}>
                                    {username}
                                    <br />
                                    {numberRew}
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
