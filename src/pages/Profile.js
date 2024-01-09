import Header from "../components/Header";
import * as React from "react";
import Footer from "../components/Footer";
import FavoritesContainer from "../components/FavoritesContainer"
import BeerCard from "../components/BeerCard";
import CustomButton from "../components/CustomButton";
import EditIcon from '@mui/icons-material/Edit';
import CustomIconButton from "../components/CustomIconButton";

const Profile = function (){
    const propsAccount = {
        variant: "contained",
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{},
        endIcon: <EditIcon />,
        text: "Edit"
    }

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <BeerCard
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
                                <CustomButton {...propsAccount} />
                            </>
                        }
                    />
                </div>
                <div style={{ flex: 1 }}>
                    Fravorites
                    <FavoritesContainer />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;
