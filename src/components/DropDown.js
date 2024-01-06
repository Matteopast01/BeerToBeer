import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";

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
            >
                {option.label}
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
                <div className="box border rounded p-3 shadow bg-white" style={{ width: '194px' }}>
                    <span>{value?.label || "Select..."}</span>
                    <GoChevronDown className="text-lg ml-2" />
                </div>
            </div>
            {isOpen && (
                <div className="dropdown-menu is-boxed absolute top-full">
                    <div className="dropdown-content box border rounded p-3 shadow bg-white">
                        {renderedOptions}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropDown;
