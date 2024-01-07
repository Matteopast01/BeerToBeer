import * as React from 'react';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import 'bulma/css/bulma.min.css';
import {Tooltip} from "@mui/material";

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
            <div className="has-text-centered mb-3">{filter.name}
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


    return (
        <div>
            <div className="box has-text-centered mb-3">
                <h3 className="title is-4">Advanced Search</h3>
                {renderedData}
            </div>
        </div>
    );
}
export default AdvancedSearch;
