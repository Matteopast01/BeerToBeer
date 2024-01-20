import { useParams } from 'react-router-dom';
import CustomCard from "../components/CustomCard";
import useAsync from "../hooks/useAsync";
import {get_docs_by_attribute, requestBeersById, store_doc} from "../services/persistence_manager";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Chip from '@mui/material/Chip';
import CustomIconButton from "../components/CustomIconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ProductCardDescription from "../components/ProductCardDescription";
import Review from "../components/Review";
import {sliderClasses} from "@mui/material";
import Footer from "../components/Footer";
import PageSwitch from "../components/PageSwitch";
import ProductReviewContainer from "../components/ProductReviewContainer";
import InputRew from "../components/InputRew";
import {useContext} from "react";
import {AuthContext} from "../contexts/Auth";
import {useDispatch} from "react-redux";
import {updateReviews} from "../store/App";

function SingleProductPage(){

    // Hook
    const {beerId} = useParams()
    const beer = useAsync(
        async ()=>{
            const b = await requestBeersById(beerId)
            return b[0]
        }
    )
    const {currentUser} = useContext(AuthContext);

    const dispatch = useDispatch()
    /*
    <CustomButton text={
                    <Chip sx={ {background: "#ffd5d5"}}  icon={<FavoriteBorderIcon  sx={{color: "#f30303"}}/>} label={"15 Likes"}/>
                }></CustomButton>
                <Chip style={{background: "#c7fdb7"}} icon={<ModeCommentOutlinedIcon/>} label={"3 REVIEWS"}/>
     */


    // Handle Function

    const handleInputRewSubmit = async (text) => {
        await store_doc({
            beer_id: beerId,
            date: Date.now(),
            id_replied_review: 0,
            review: text,
            uid_author: currentUser.uid
        }, "Review")
        const rews_redux = await get_docs_by_attribute(beerId, "Review", "beer_id", null, "date", "desc")
        dispatch(updateReviews(rews_redux))
    }

    // Render

    return (
        <div>
            <Header/>
            <br/>
            {!!beer ?
            <CustomCard img={beer.image_url} horizontal contentStyle={{width:"75%", background: "#f5f5f5"}} maxWidth={"100%"}>
                <ProductCardDescription beer={beer}/>
            </CustomCard> : ""}
            <ProductReviewContainer beerId={beerId}/>
            <InputRew placeholder={"type your review..."} onSubmit={handleInputRewSubmit}></InputRew>
            <Footer/>
        </div>
    )

}

export default SingleProductPage