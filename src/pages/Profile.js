import Header from "../components/Header";
import * as React from "react";
import Footer from "../components/Footer";
import FavoritesContainer from "../components/FavoritesContainer"
import CustomCard from "../components/CustomCard";
import Popup from "../components/Popup";

const Profile = function (){

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
                        //TO DO: recuperare la foto profilo username e n. recensioni
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
                                <Popup/>
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
