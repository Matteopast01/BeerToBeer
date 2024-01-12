import SimpleSlider from "./Slider";
import ReviewContainer from "./ReviewContainer";

function SinglePub({pub}){

    const images = []; // TODO MATTEO: query che recupera le immagini del pub passato come props
    const description = ""; // TODO MATTEO: query che recupera la descrizione del pub passato come props

    // TODO: il componente legge lo stato di redux pubSelected per fare le query
    // TODO: onClick sul "Chiudi" azzera lo stato pubSelected
    return (
        <div>
            "Chiudi"
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