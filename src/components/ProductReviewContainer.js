import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Review from "./Review";
import {updateReviews} from "../store/App";
import {get_docs_by_attribute} from "../services/persistence_manager";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";


const ProductReviewContainer = function({beerId}){
     //Hook
    const dispatch = useDispatch()
    const reviews = useSelector((state) => state.review.reviews)
    useEffect(() => {
        (async () => {
            const rews_redux = await get_docs_by_attribute(beerId, "Review", "beer_id", null, "date", "desc")
            dispatch(updateReviews(rews_redux))
        })()
    }, []);

    // Utility
    const rews = []
    const rew_answers = {}
    reviews.map((item)=>{
        if( item.id_replied_review === 0){
            rews.push(item)
        }
        else if( item.id_replied_review in rew_answers){
           rew_answers[ item.id_replied_review ].push(item)
        }
        else {
            rew_answers[ item.id_replied_review ] = [item]
        }
    })

    // Render
    const render_rews = (rews)=>{
        return rews.map((rew, index)=>{
            return (
                <div>
                    <Review rew={rew} answers={rew_answers[rew.doc_id]}/>
                    <Divider/>
                </div>
            )
        })
    }
    console.log(reviews)

    return (
        <div style={{overflow: "auto", maxHeight: "25%"}}>
            {!(reviews.length === 0) ? render_rews(rews):
                <div style={{marginTop: "50px", marginBottom: "50px"}}>
                    <Typography sx={{textAlign: "center"}} fontSize={25}> {"Non ci Sono Recensioni"} </Typography>
                </div>}
        </div>
    )



}

 export default ProductReviewContainer