import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import Review from "./Review";
import {setRewToOption, setRewToReply, updateReviews} from "../store/App";
import {get_docs_by_attribute, pull_img_url} from "../services/persistence_manager";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";
import {loads_rews, sort_reviews} from "../services/utility/review_utility";
import {AuthContext} from "../contexts/Auth";

const ProductReviewContainer = function({beerId}){
     //Hook
    const dispatch = useDispatch()
    const reviews = useSelector((state) => state.review.reviews)
    useEffect(() => {
        (async () => {
            const rews_redux = await loads_rews(await get_docs_by_attribute(beerId, "Review", "beer_id", null, "date", "desc"))
            dispatch(updateReviews(rews_redux))
        })()
    }, []);
    const {currentUser} = useContext(AuthContext);

    // Utility
    const sorted_rew = sort_reviews(reviews)
    const rews = sorted_rew.reviews
    const rew_answers = sorted_rew.answers

    // Handle function

    const handleReply = (rew)=>{
        dispatch(setRewToReply(rew))
    }

    const handleOptionClicked = (rew)=>{
        dispatch(setRewToOption(rew))
    }

    // Render
    const render_rews = (rews)=>{
        return rews.map((rew, index)=>{
            return (
                <div key={rew.doc_id}>
                    <Review rew={rew}
                            answers={!!(rew.doc_id in rew_answers) ? rew_answers[rew.doc_id].reverse(): []}
                            onReply={handleReply}
                            onOptionClick={handleOptionClicked}
                            showOptions={!!currentUser && (currentUser.uid === rew.user.uid || currentUser.role)}
                            showOptionsAnswers={!!currentUser && currentUser.role}
                            showReplyButton={!!currentUser}
                    />
                    <Divider/>
                </div>
            )
        })
    }
    console.log(reviews)

    return (
        <div style={{overflowY: "auto", overflowX: "hidden", maxHeight: "500px"}}>
            {!(reviews.length === 0) ? render_rews(rews):
                <div style={{marginTop: "50px", marginBottom: "50px"}}>
                    <Typography sx={{textAlign: "center"}} fontSize={25}> {"There are no reviews"} </Typography>
                </div>}
        </div>
    )
}

 export default ProductReviewContainer;