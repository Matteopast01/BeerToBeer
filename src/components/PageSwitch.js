import SinglePub from "./SinglePub";
import PubContainer from "./PubContainer";
import {useSelector} from "react-redux";

function PageSwitch(){

    const pubSelected = useSelector(state => state.pub);

    return (
      <div>
          {!!pubSelected ? <SinglePub/> : <PubContainer/>}
      </div>
    );
}

export default PageSwitch;