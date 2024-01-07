import * as React from "react";
import DropDown from "../components/DropDown";

function Sorting({ options, selection, handleSelect }) {
    return (
        <div className="has-text-centered mb-3">
            <div className="mb-3">
                <DropDown options={options} value={selection} onChange={handleSelect} />
            </div>
        </div>
    );
}

export default Sorting;
