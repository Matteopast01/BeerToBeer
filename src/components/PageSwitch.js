import SinglePub from "./SinglePub";
import PubContainer from "./PubContainer";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

function PageSwitch(){
    const pubSelected = useSelector(state => state.pub.value);

    return (
      <div>
          {!!pubSelected ? <SinglePub/> : <PubContainer/>}
      </div>
    );
}

export default PageSwitch;