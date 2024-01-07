import DropDown from "../components/DropDown";
import * as React from "react";

function Sorting({ options, selection, handleSelect, secondOptions, secondSelection, handleSecondSelect }) {
    return (
        <div className="box has-text-centered mb-3">
            <div className="mb-3">
                <h5 className="title is-4">Sorting</h5>
                <DropDown options={options} value={selection} onChange={handleSelect} />
            </div>
            <div>
                <DropDown options={secondOptions} value={secondSelection} onChange={handleSecondSelect} />
            </div>
        </div>
    );
}
export default Sorting;
