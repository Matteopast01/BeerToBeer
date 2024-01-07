import { useState } from "react";

const useDropDown = (initialValue, options) => {
    const [selection, setSelection] = useState(initialValue || { label: "Seleziona...", value:null});

    const handleSelect = (option) => {
        setSelection(option);
    };

    return { options };
};

export default useDropDown;
