import Header from "../components/Header";
import * as React from "react";
import Footer from "../components/Footer";
import FavoritesContainer from "../components/FavoritesContainer"

const Profile = function (){
    return (
        <div>
            <div>
                <Header/>
            </div>
            <FavoritesContainer/>

            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Profile;
