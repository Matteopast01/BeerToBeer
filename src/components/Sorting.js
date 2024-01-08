import * as React from "react";
import DropDown from "../components/DropDown";
import useDropDown from "../hooks/useDropDown";

function Sorting() {

    const {selection, handleSelect,options} = useDropDown(null, [
        {label: "-", value: "-"},
        {label: "Alphabetical", value: "alphabetical"},
        {label: "IBV", value: "ibv"},
        {label: "Number of like", value: "number of like"},
    ]);
    const { selection: secondSelection, handleSelect: handleSecondSelect,
        options: secondOptions } = useDropDown(null, [
        { label: "Increasing", value: "increasing" },
        { label: "Decreasing", value: "decreasing" },
    ]);

    return (
        <div className="has-text-centered mb-3">
            <div className="mb-3">
                <DropDown options={options} value={selection} onChange={handleSelect} />
            </div>
            <div className="mb-3">
                <DropDown options={secondOptions} value={secondSelection} onChange={handleSecondSelect} />
            </div>
        </div>
    );
}

export default Sorting;
