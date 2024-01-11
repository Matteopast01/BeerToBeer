import {useState} from "react";
import SinglePub from "./SinglePub";
import PubContainer from "./PubContainer";


// page switch passa handleClick a pubContainer che lo passa alle carda dei pub...Redux o no?
function PageSwitch(){

    function handleClick() {
        setSwitchFragment(<SinglePub />)
        // setPubSelected()
    }

    const [switchFragment, setSwitchFragment] = useState(<PubContainer {...handleClick}/>) // TODO Matteo: onclick sulla card del pub
    const [pubSelected, setPubSelected] = useState("")

    return (
      <div>
          {switchFragment} switch Fragment
      </div>
    );
}

export default PageSwitch;