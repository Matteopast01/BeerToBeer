import {useDispatch, useSelector} from "react-redux";
import CustomIconButton from "./CustomIconButton";
import CloseIcon from '@mui/icons-material/Close';
import {
    resetPubSelected, setPubRewToOption,
    setPubRewToReply,
    setSearchTerm,
    updatePubReviews
} from "../store/App";
import CustomCard from "./CustomCard";
import {useContext, useEffect} from "react";
import {delete_doc, delete_doc_by_attribute, get_docs_by_attribute, store_doc} from "../services/persistence_manager";
import {loads_rews} from "../services/utility/review_utility";
import {AuthContext} from "../contexts/Auth";
import InputRew from "./InputRew";
import PubReviewContainer from "./PubReviewContainer";
import Option from "./Option";
import theme from "../style/palette";

function SinglePub() {

    //Hook
    const pubSelected = useSelector(state => state.pub.value);
    useEffect(() => {
        return ()=>{
            dispatch(setPubRewToReply(null))
            dispatch(setPubRewToOption(null))}
    }, [pubSelected]);
    const rewToReply = useSelector((state) => state.pub_review.rewToReply)
    const rewToOption = useSelector((state)=> state.pub_review.rewToOption)
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
    let images = pubSelected.img;
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
        const rews_redux = await loads_rews( await get_docs_by_attribute(pubSelected.id, "Pub_Review",
            "pub_id", null, "date", "desc"))
        dispatch(updatePubReviews(rews_redux))
        dispatch(setPubRewToReply(null))
    }

    const handleInputRewUnreply = async () =>{
        dispatch(setPubRewToReply(null))
    }

    const handleOptionRewCancel = ()=> {
        dispatch(setPubRewToOption(null))
    }

    const handleOptionRewDelete = async () => {
        await delete_doc("Pub_Review", rewToOption.doc_id)
        delete_doc_by_attribute("Pub_Review", "id_replied_review", rewToOption.doc_id)
        dispatch(setPubRewToOption(null))
        const rews_redux = await loads_rews( await get_docs_by_attribute(pubSelected.id, "Pub_Review",
            "pub_id", null, "date", "desc"))
        dispatch(updatePubReviews(rews_redux))
    }

    return (

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', paddingTop: '7px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <div style={{width: '70px'}}/>
                <div style={{position: 'absolute', top: 0, right: 0, zIndex: 1, width: '70px', textAlign: 'center'}}>
                    <CustomIconButton icon={<CloseIcon sx={{color: theme.palette.error.main}}/>}
                                      handleClick={handleClick} size={"small"} variant="text" color="error"/>
                </div>
            </div>
            <CustomCard img={images} cardDescriptionStyle={{width: "100%", background: theme.palette.info.light}}
                        maxWidth={"95%"}>
                <div style={{flex: '1', textAlign: 'center', fontSize: '30px', fontFamily: 'Arial, sans-serif'}}>
                    <b>{name}</b>
                </div>
                <div style={{
                    textAlign: 'left',
                    fontSize: '16px',
                    fontFamily: 'Arial, sans-serif',
                    marginLeft: "5px",
                    marginRight: "5px"
                }}>
                    {description}
                </div>
            </CustomCard>
            <div style={{width: "95%"}}>
                <PubReviewContainer/>
                {!!currentUser ? (
                    <div>
                        <InputRew
                            style={{marginTop: "1%", marginLeft: "10%", marginRight: "10%"}}
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
                ) : ""}
            </div>
        </div>

    );
}

export default SinglePub;
