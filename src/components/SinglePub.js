import {useDispatch, useSelector} from "react-redux";
import CustomIconButton from "./CustomIconButton";
import CloseIcon from '@mui/icons-material/Close';
import {
    resetPubSelected,
    setPubRewToReply,
    setRewToReply,
    setSearchTerm,
    updatePubReviews,
    updateReviews
} from "../store/App";
import CustomCard from "./CustomCard";
import {useContext, useEffect} from "react";
import {get_docs_by_attribute, store_doc} from "../services/persistence_manager";
import {loads_rews} from "../services/utility/review_utility";
import {AuthContext} from "../contexts/Auth";
import InputRew from "./InputRew";
import PubReviewContainer from "./PubReviewContainer";

function SinglePub() {

    //Hook
    const pubSelected = useSelector(state => state.pub.value);
    useEffect(() => {
        return ()=>{dispatch(setPubRewToReply(null))}
    }, []);
    const rewToReply = useSelector((state) => state.pub_review.rewToReply)
    const dispatch = useDispatch();
    const {currentUser} = useContext(AuthContext);


    // if we are rendering singlePub it means that a pubSelected exists and so its properties images and description
    // however js needs a fallback value in case of null state

    //pubSelected.name (nome)
    //pubSelected.img (immagine)
    //pubSelected.description (descrizione)
    //pubSelected.lat
    //pubSelected.lng

    // Utility

    let images = pubSelected?.img || [];
    let description = pubSelected?.description || "";
    let name = pubSelected?.name;



     // Handle Function
     function handleClick(){
         dispatch(resetPubSelected(null))
         dispatch(setSearchTerm(""))
    }

    const handleInputRewSubmit = async (text) => {
        await store_doc({
            pub_id: pubSelected.id,
            date: Date.now(),
            id_replied_review: !!rewToReply ? rewToReply.doc_id : 0 ,
            review: text,
            uid_author: currentUser.uid
        }, "Pub_Review")
        const rews_redux = await loads_rews( await get_docs_by_attribute(pubSelected.id, "Pub_Review", "pub_id", null, "date", "desc"))
        dispatch(updatePubReviews(rews_redux))
        dispatch(setPubRewToReply(null))
    }

    const handleInputRewUnreply = async () =>{
        dispatch(setPubRewToReply(null))
    }

    return (

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <div style={{width: '70px'}}/>
                <div style={{flex: '1', textAlign: 'center', fontSize: '40px', fontFamily: 'Arial, sans-serif'}}>
                    <b>{name}</b>
                </div>
                <div style={{ width: '70px' }} />
                <div style={{ width: '50px' }}>
                    <CustomIconButton icon={<CloseIcon sx={{ color: '#f30303' }} />} handleClick={handleClick} size={"medium"} />
                </div>
            </div>
            <CustomCard img={images}  contentStyle={{width:"100%", background: "#f5f5f5"}} maxWidth={"95%"}>
                <div style={{textAlign: 'left', fontSize: '16px', fontFamily: 'Arial, sans-serif'}}>
                    {description}
                </div>
            </CustomCard>
            <div style={{width: "95%"}}>
                <PubReviewContainer pubId={pubSelected.id}/>
                <InputRew
                    style={{marginTop: "1%", marginLeft: "10%", marginRight:"10%"}}
                    placeholder={"type your review..."}
                    onSubmit={handleInputRewSubmit}
                    rewToReply={rewToReply}
                    onUnreply={handleInputRewUnreply}
                    replyPlaceholder={"type your reply..."}
                />
            </div>

        </div>
    );
}

export default SinglePub;