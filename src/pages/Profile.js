import Header from "../components/Header";
import * as React from "react";
import Footer from "../components/Footer";
import FavoritesContainer from "../components/FavoritesContainer"
import BeerCard from "../components/BeerCard";

const Profile = function (){
    return (
        <div>
            <div>
                <Header/>
                <div>
                    <BeerCard>
                    </BeerCard>
                </div>
            </div>
            <FavoritesContainer/>

            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Profile;
