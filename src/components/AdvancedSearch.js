import * as React from 'react';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import 'bulma/css/bulma.min.css';
import {Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import store, {updateFilter} from "../store/searchStore";

function valuetext(value) {
    return `${value}`;
}

function AdvancedSearch({ data }) {
   // console.log(data);
   // const [values, setValues] = React.useState(data.map(() => [20, 37]));
    const dispatch = useDispatch();
    const values = useSelector(state => state.filters.values);

    //console.log(store.getState());


    const handleChange = (index) => (event, newValue) => {
       // console.log(index, newValue);
        dispatch(updateFilter({index, newValue}));
        /*const newValues = [...values];
        newValues[index] = newValue;
        setValues(newValues);*/
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
                value={[Number(values[index].min), Number(values[index].max)]}
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
