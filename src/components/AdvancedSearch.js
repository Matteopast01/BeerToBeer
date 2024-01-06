import * as React from 'react';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import 'bulma/css/bulma.min.css';
import {Tooltip} from "@mui/material";
import DropDown from "../components/DropDown";
import useDropDown from "../hooks/useDropDown";

function valuetext(value) {
    return `${value}`;
}

function AdvancedSearch({ data }) {
    const [values, setValues] = React.useState(data.map(() => [20, 37]));

    const handleChange = (index) => (event, newValue) => {
        const newValues = [...values];
        newValues[index] = newValue;
        setValues(newValues);
    };

    const renderedData = data.map((filter, index) => (
        <div key={index}>
            <div className="has-text-centered mb-3 subtitle">{filter.name}
                <Tooltip title={filter.description} arrow>
                <IconButton aria-label="delete" size="small">
                    <InfoOutlinedIcon fontSize="medium" />
                </IconButton>
                </Tooltip>
                </div>
            <Slider
                sx={{ color: 'black', '& .MuiSlider-thumb': { boxShadow: 'none' } }}
                getAriaLabel={() => 'range'}
                value={values[index]}
                onChange={handleChange(index)}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </div>
    ));

    //DROPDOWN
    const {selection, handleSelect,options} = useDropDown(null, [
        {label: "-", value: "-"},
        {label: "Alphabetical", value: "alphabetical"},
        {label: "IBV", value: "ibv"},
        {label: "Number of like", value: "number of like"},
    ]);

    return (
        <div>
            <div className="box column is-3 has-text-centered mb-3 title">
                Advanced Search {renderedData}
            </div>
            <div className="box column is-3 has-text-centered mb-3">
                <DropDown options={options} value={selection} onChange={handleSelect} />
            </div>
        </div>
    );
}
export default AdvancedSearch;
