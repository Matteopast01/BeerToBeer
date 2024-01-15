import SimpleSlider from "./Slider";
import ReviewContainer from "./ReviewContainer";
import {useDispatch, useSelector} from "react-redux";
import CustomIconButton from "./CustomIconButton";
import CloseIcon from '@mui/icons-material/Close';
import {resetPubSelected} from "../store/App";

function SinglePub(){

    const singlePub = {
        // TODO MATTEO: recupera un pub da DB, mi potrebbe servire
    }

    const pubSelected = useSelector(state => state.pub);

    // if we are rendering singlePub it means that a pubSelected exists and so its properties images and description
    // however js needs a fallback value in case of null state
    let images = pubSelected?.images || [];
    let description = pubSelected?.description || "";

     const dispatch = useDispatch();

     function handleClick(){
        dispatch(resetPubSelected(null))
    }

    return (
        <div style={{textAlign: "center"}}>
            "for debugging: rendering SinglePub"
            <div>
                <div style={{textAlign: "right"}}>
                    <CustomIconButton icon={<CloseIcon/>} onClick={handleClick} size={"medium"}/>
                </div>
                <SimpleSlider imags={images}/>
                <div>
                    {description} {/* TODO quì ci va la descrizione con un qualche container? */}
                </div>
                <ReviewContainer/>
            </div>
        </div>
    );
}

export default SinglePub;