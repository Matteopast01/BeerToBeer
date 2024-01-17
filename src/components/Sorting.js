import * as React from "react";
import DropDown from "../components/DropDown";
import {useDispatch, useSelector} from "react-redux";
import {setSelection1, setSelection2} from "../store/App";

function Sorting() {
    const dispatch = useDispatch();
    const selection1 = useSelector((state) => state.sorting.selection1);
    const selection2 = useSelector((state) => state.sorting.selection2);

    const  options1 =  [
        {label: "-", value: "-"},
        {label: "Alphabetical", value: "alphabetical"},
        {label: "IBU", value: "ibu"},
        {label: "Number of like", value: "number of like"},
    ];
    const options2 = [
        { label: "Increasing", value: "increasing" },
        { label: "Decreasing", value: "decreasing" },
    ];

    const handleSelect1 = (option) => {
        dispatch(setSelection1(option));
        dispatch(setSelection2(options2[0]))
    };

    const handleSelect2 = (option) => {
        dispatch(setSelection2(option));
    };

    return (
        <div className="has-text-centered mb-3">
            <div className="mb-3">
                <DropDown options={options1} value={selection1} onChange={handleSelect1} />
            </div>
            <div className="mb-3">
                <DropDown options={options2} value={selection2} onChange={handleSelect2} />
            </div>
        </div>
    );
}

export default Sorting;