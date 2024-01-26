import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import theme from "../style/palette";
import {Divider} from "@mui/material";

function DropDown({ options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (divEl.current && !divEl.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handler, true);
        return () => {
            document.removeEventListener("click", handler);
        };
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onChange(option);
    };

    const renderedOptions = options.map((option) => {
        return (
            <div
                className="hover:bg-link rounded cursor-pointer p-1"
                onClick={() => handleOptionClick(option)}
                key={option.value}
                style={{ cursor: "pointer" }}
            >
                {option.label}
                {/*// TODO: metterci stato con hover per evidenziare la scelta*/}
            </div>
        );
    });

    return (
        <div ref={divEl} className="dropdown is-active w-48 relative">
            <div
                className="dropdown-trigger"
                onClick={handleClick}
                style={{ cursor: "pointer" }}
            >
                <div className="box border rounded p-3 shadow bg-white" style={{ // TODO: punto modificato palette
                    width: '194px', textAlign: "center", boxShadow: `1px 1px 3px ${theme.palette.primary.dark}`}}>
                    <span>{value?.label || "Select..."}</span>
                    <GoChevronDown className="text-lg ml-2" />
                </div>
            </div>
            {isOpen && (
                <div className="dropdown-menu is-boxed absolute top-full"
                     style={{width: '194px', boxShadow: `0px 0px 1px ${theme.palette.primary.main}`}}>
                    <div className="dropdown-content box border rounded p-3 shadow bg-white">
                        {renderedOptions}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropDown;
