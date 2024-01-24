import { useParams } from 'react-router-dom';
import CustomCard from "../components/CustomCard";
import useAsync from "../hooks/useAsync";
import {
    delete_doc, delete_doc_by_attribute,
    get_docs_by_attribute, pull_img_url,
    requestBeersById,
    store_doc, update_by_function
} from "../services/persistence_manager";
import Header from "../components/Header";
import Chip from '@mui/material/Chip';
import ProductCardDescription from "../components/ProductCardDescription";
import Footer from "../components/Footer";
import ProductReviewContainer from "../components/ProductReviewContainer";
import InputRew from "../components/InputRew";
import {useContext, useEffect, useRef} from "react";
import {AuthContext} from "../contexts/Auth";
import {useDispatch, useSelector} from "react-redux";
import {updateReviews, setRewToReply, setRewToOption} from "../store/App";
import {loads_rews} from "../services/utility/review_utility";
import {Dialog} from "@mui/material";
import CustomButton from "../components/CustomButton";
import Option from "../components/Option";




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
    useEffect(() => {
        update_by_function("Beer_Id","id",Number(beerId), (obj)=>{
            obj.number_calls += 1
            return obj
        })
        return ()=>{
            dispatch(setRewToReply(null))
            dispatch(setRewToOption(null))
        }
    }, []);
    const dispatch = useDispatch()
    const rewToReply = useSelector((state) => state.review.rewToReply)
    const rewToOption = useSelector((state) => state.review.rewToOption)
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
        dispatch(setRewToReply(null))
        const rews_redux = await loads_rews( await get_docs_by_attribute(beerId, "Review", "beer_id", null, "date", "desc"))
        dispatch(updateReviews(rews_redux))
    }

    const handleInputRewUnreply = async () =>{
        dispatch(setRewToReply(null))
    }

    const handleOptionRewCancel = ()=>{
        dispatch(setRewToOption(null))
    }

    const handleOptionRewDelete = async () => {
        await delete_doc("Review", rewToOption.doc_id)
        delete_doc_by_attribute("Review", "id_replied_review", rewToOption.doc_id)
        dispatch(setRewToOption(null))
        const rews_redux = await loads_rews( await get_docs_by_attribute(beerId, "Review", "beer_id", null, "date", "desc"))
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
            {
                !! currentUser ?
                    (
                        <div>
                            <InputRew
                                style={{marginTop: "1%", marginLeft: "10%", marginRight:"10%"}}
                                placeholder={"type your review..."}
                                onSubmit={handleInputRewSubmit}
                                rewToReply={rewToReply}
                                onUnreply={handleInputRewUnreply}
                                replyPlaceholder={"write your reply..."}
                            />
                            <Option
                                open={!!rewToOption}
                                deleteLabel={"Delete Review"}
                                cancelLabel={"Cancel"}
                                onCancel={handleOptionRewCancel}
                                onDelete={handleOptionRewDelete}
                            />
                        </div>
                    )
                    : ""
            }
            <Footer/>
        </div>
    )

}

export default SingleProductPage