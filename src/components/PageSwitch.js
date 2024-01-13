import SinglePub from "./SinglePub";
import PubContainer from "./PubContainer";

function PageSwitch(){

// TODO: legge lo stato di redux pubSelected: se vuoto display di pubContainer, altrimenti di single pub
    const pubSelected = ""; // TODO: questo è il pub selezionato da prendere dallo store

    return (
      <div>
          {!!pubSelected ? <SinglePub pub={pubSelected}/> : <PubContainer/>}
      </div>
    );
}

export default PageSwitch;