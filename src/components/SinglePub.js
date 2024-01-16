import SimpleSlider from "./Slider";
import ReviewContainer from "./ReviewContainer";
import {useDispatch, useSelector} from "react-redux";
import CustomIconButton from "./CustomIconButton";
import CloseIcon from '@mui/icons-material/Close';
import {resetPubSelected} from "../store/App";

function SinglePub(){



    const pubSelected = useSelector(state => state.pub.value);

    // if we are rendering singlePub it means that a pubSelected exists and so its properties images and description
    // however js needs a fallback value in case of null state




    //pubSelected.name  (nome)
    //pubSelected.img (immagine)
    //pubSelected.description (descrizione)
    //pubSelected.lat
    //pubSelected.lng


    let images = pubSelected?.img || [];
    let description = pubSelected?.description || "";

    let name = pubSelected?.name

     const dispatch = useDispatch();

     function handleClick(){
         console.log("ciao")
        dispatch(resetPubSelected(null))
    }

    return (
        <div style={{textAlign: "center"}}>
            "for debugging: rendering SinglePub"
            <div>
                <div style={{textAlign: "right"}}>
                    <CustomIconButton icon={<CloseIcon/>} handleClick={handleClick} size={"medium"}/>
                </div>
                {/* <SimpleSlider imags={images}/> */}
                <div>
                    {description} {/* TODO quì ci va la descrizione con un qualche container? */}
                </div>
                <ReviewContainer/>
            </div>
        </div>
    );
}

export default SinglePub;