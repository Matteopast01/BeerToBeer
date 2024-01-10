import {useState} from "react";
import SinglePub from "./SinglePub";
import PubContainer from "./PubContainer";


// page switch passa handleClick a pubContainer che lo passa alle carda dei pub...Redux o no?
function PageSwitch ({SwitchComponent}, handleClick) {
    return (
      <div>
          {SwitchComponent} switch Component
      </div>
    );
}

export default PageSwitch;