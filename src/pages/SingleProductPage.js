import { useParams } from 'react-router-dom';
import CustomCard from "../components/CustomCard";
import {
    delete_doc,
    delete_doc_by_attribute,
    get_docs_by_attribute, pull_img_url,
    requestBeersById,
    store_doc, update_by_function
} from "../services/persistence_manager";
import Header from "../components/Header";
import ProductCardDescription from "../components/ProductCardDescription";
import Footer from "../components/Footer";
import ProductReviewContainer from "../components/ProductReviewContainer";
import InputRew from "../components/InputRew";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../contexts/Auth";
import {useDispatch, useSelector} from "react-redux";
import {updateReviews, setRewToReply, setRewToOption, setSelectedBeer} from "../store/App";
import {loads_rews} from "../services/utility/review_utility";
import Option from "../components/Option"
import theme from "../style/palette";

function SingleProductPage() {

    const {beer_Id} = useParams()
    const beer = useSelector((state)=> state.selectedBeer.value)
    const {currentUser} = useContext(AuthContext);
    const dispatch = useDispatch()

    useEffect(() => {

        (async  ()=> {
            const beer_api = await requestBeersById(beer_Id)
            const beer_firebase = await get_docs_by_attribute(Number(beer_Id),"Beer_Id", "id")
            dispatch(setSelectedBeer({
                ...beer_api[0],
                ...beer_firebase[0]
            }))
        })()

        return ()=>{
            dispatch(setSelectedBeer(null))
            dispatch(setRewToOption(null))
        }
    }, []);

    useEffect(() => {
        (async  ()=> {
            const beerId = !!beer ? beer.id : beer_Id
            update_by_function("Beer_Id","id",Number(beerId), (obj)=>{
                obj.number_calls += 1
                return obj
            })
            if (!window.location.href.includes(beerId)) {
                window.history.pushState({}, '', `/product/${beerId}`);
            }
        })()
        return ()=>{
            /*
            window.addEventListener("popstate", ()=>{
                dispatch(setSelectedBeer(beer))
            })
             */
            dispatch(setRewToReply(null))
            dispatch(setRewToOption(null))

        }
    }, [beer]);

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
            beer_id: String(beer.id),
            date: Date.now(),
            id_replied_review: !!rewToReply ? rewToReply.doc_id : 0 ,
            review: text,
            uid_author: currentUser.uid
        }, "Review")
        const rews_redux = await loads_rews( await get_docs_by_attribute(String(beer.id), "Review", "beer_id", null, "date", "desc"))
        dispatch(updateReviews(rews_redux))
        dispatch(setRewToReply(null))
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
        const rews_redux = await loads_rews( await get_docs_by_attribute(beer.id, "Review",
            "beer_id", null, "date", "desc"))
        dispatch(updateReviews(rews_redux))
    }

    return (
        <>
            <Header singleProductPage/>
            <br/>
            {!!beer ?
            <CustomCard img={beer.image_url} horizontal cardDescriptionStyle={{width:"75%",
                background: theme.palette.info.light}} maxWidth={"100%"}>
                <ProductCardDescription beer={beer}/>
            </CustomCard> : ""}
            <ProductReviewContainer />
            {
                !! currentUser ?
                    (
                        <div>
                            <InputRew
                                style={{marginTop: "1%", marginLeft: "10%", marginRight:"10%"}}
                                placeholder={"write your review..."}
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
        </>
    )
}

export default SingleProductPage;