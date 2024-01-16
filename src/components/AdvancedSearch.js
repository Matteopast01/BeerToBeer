import * as React from 'react';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import 'bulma/css/bulma.min.css';
import {Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {updateFilter} from "../store/App";

function valuetext(value) {
    return `${value}`;
}

function AdvancedSearch( ) {
    const filters = [
        {name: "ABV", description:"Alcohol by volume (ABV) is a metric used to determine the alcohol content in an alcoholic beverage."},
        {name: "IBV", description:"International Bitterness Unit (IBU): Measures beer bitterness from hops."},
        {name: "SMR", description:"Standard Reference Method (SRM): Quantifies beer color by measuring light absorbance."}
    ];

    const dispatch = useDispatch();
    const values = useSelector(state => state.filters.values);


    const handleChange = (index) => (event, newValue) => {
        dispatch(updateFilter({index, newValue}));
    };

    const renderedData = filters.map((filter, index) => (
        <div key={index}>
            <div className="has-text-centered mb-3">
                {filter.name}
                <Tooltip title={filter.description} arrow>
                <IconButton aria-label="delete" size="small">
                    <InfoOutlinedIcon fontSize="medium" />
                </IconButton>
                </Tooltip>
                </div>
            <Slider
                sx={{ color: '#333333',
                    '& .MuiSlider-thumb': {
                        boxShadow: 'none',
                        '&:hover, &:focus, &.Mui-focusVisible': {
                            boxShadow: '0 0 0 8px rgba(240, 240, 240, 0.5)',
                        },} }}
                getAriaLabel={() => 'range'}
                value={[Number(values[index].min), Number(values[index].max)]}
                onChange={handleChange(index)}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={10}
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
