import SimpleSlider from "./Slider";
import useAsync from "../hooks/useAsync";
import {pull_img_url} from "../services/persistence_manager";
import ReviewContainer from "./ReviewContainer";

function SinglePub(){

    const images = []; // TODO Matteo: query che recupera una o più immagini del pub
    const description = ""; // TODO Matteo: query che recupera la descrizione del pub

    return (
        <div>
            <div>
                <SimpleSlider imags={images}/>
                <div>
                    {description}
                </div>
                <ReviewContainer/>
            </div>
        </div>

    );
}

export default SinglePub;