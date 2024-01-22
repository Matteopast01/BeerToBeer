import { useParams } from 'react-router-dom';
import CustomCard from "../components/CustomCard";
import useAsync from "../hooks/useAsync";
import {
    get_docs_by_attribute, pull_img_url,
    requestBeersById,
    store_doc
} from "../services/persistence_manager";
import Header from "../components/Header";
import Chip from '@mui/material/Chip';
import ProductCardDescription from "../components/ProductCardDescription";
import Footer from "../components/Footer";
import ProductReviewContainer from "../components/ProductReviewContainer";
import InputRew from "../components/InputRew";
import {useContext} from "react";
import {AuthContext} from "../contexts/Auth";
import {useDispatch, useSelector} from "react-redux";
import {updateReviews, setRewToReply} from "../store/App";
import {loads_rews} from "../services/utility/review_utility";




function SingleProductPage(){

    // Hook
    const {beerId} = useParams()
    const beer = useAsync(
        async ()=>{
            const beer_api = await requestBeersById(beerId)
            const beer_firebase = await get_docs_by_attribute(Number(beerId),"Beer_Id", "id")
            console.log(beer_firebase)
            console.log(
                {
                    number_likes : beer_firebase[0].number_likes,
                    ...beer_api[0],

                }
            )
            return {
                ...beer_api[0],
                ...beer_firebase[0]
            }
        }
    )
    const {currentUser} = useContext(AuthContext);

    const dispatch = useDispatch()
    const rewToReply = useSelector((state) => state.review.rewToReply)
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
            id_replied_review: !!rewToReply ? rewToReply.doc_id : 0 ,
            review: text,
            uid_author: currentUser.uid
        }, "Review")
        const rews_redux = await loads_rews( await get_docs_by_attribute(beerId, "Review", "beer_id", null, "date", "desc"))
        dispatch(updateReviews(rews_redux))
        dispatch(setRewToReply(null))
    }

    const handleInputRewUnreply = async () =>{
        dispatch(setRewToReply(null))
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
            <InputRew
                style={{marginTop: "1%", marginLeft: "10%", marginRight:"10%"}}
                placeholder={"type your review..."}
                onSubmit={handleInputRewSubmit}
                rewToReply={rewToReply}
                onUnreply={handleInputRewUnreply}
            />
            <Footer/>
        </div>
    )

}

export default SingleProductPage