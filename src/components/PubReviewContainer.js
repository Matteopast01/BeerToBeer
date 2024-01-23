import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loads_rews, sort_reviews} from "../services/utility/review_utility";
import {get_docs_by_attribute} from "../services/persistence_manager";
import {setPubRewToReply, setRewToReply, updatePubReviews, updateReviews} from "../store/App";
import Review from "./Review";
import {Divider} from "@mui/material";
import Typography from "@mui/material/Typography";

function PubReviewContainer({pubId}) {
    //Hook
    const dispatch = useDispatch()
    const reviews = useSelector((state) => state.pub_review.reviews)
    useEffect(() => {
        (async () => {
            const rews_redux = await loads_rews(await get_docs_by_attribute(pubId, "Pub_Review", "pub_id", null, "date", "desc"))
            dispatch(updatePubReviews(rews_redux))
        })()
    }, []);


    //Utility
    const sorted_rew = sort_reviews(reviews)

    //Handle Function

    const handleReply = (rew)=>{
        dispatch(setPubRewToReply(rew))
    }


    // Render
    const render_rews = (rews)=>{
        return rews.map((rew, index)=>{
            return (
                <div key={rew.doc_id}>
                    <Review rew={rew} answers={!!(rew.doc_id in sorted_rew.answers) ? sorted_rew.answers[rew.doc_id].reverse(): []} onReply={handleReply}/>
                    <Divider/>
                </div>
            )
        })
    }

    return (
        <div style={{overflowY: "auto", overflowX: "hidden", maxHeight: "500px"}}>
            {!(reviews.length === 0) ? render_rews(sorted_rew.reviews):
                <div style={{marginTop: "50px", marginBottom: "50px"}}>
                    <Typography sx={{textAlign: "center"}} fontSize={25}> {"There are any reviews"} </Typography>
                </div>}
        </div>
    )
}

export default PubReviewContainer;