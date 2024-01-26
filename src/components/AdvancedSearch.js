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

function AdvancedSearch() {

    const SearchedBeers = useSelector((state)=>state.searchedBeers.searchedBeers)

    const computeFilterValues  = function(beers ){

        let abv = []
        let ibv = []
        let srm = []

        beers.forEach((beer)=>{
            abv.push(beer.abv)
            ibv.push(beer.ibu)
            srm.push(beer.srm)
        })

        let minAbv = Math.min(...abv);
        let maxAbv = Math.max(...abv);
        let minIbv = Math.min(...ibv);
        let maxIbv = Math.max(...ibv);
        let minSrm = Math.min(...srm);
        let maxSrm = Math.max(...srm);
       return [{minAbv: minAbv, maxAbv: maxAbv }, {minIbv: minIbv, maxIbv: maxIbv }, {minSrm:minSrm, maxSrm: maxSrm}]

    }
    const filtersValues = computeFilterValues(SearchedBeers)


    const filters = [
        {name: "ABV", description:"Alcohol by volume (ABV) is a metric used to determine the alcohol content in an alcoholic beverage.", min:filtersValues[0].minAbv, max:filtersValues[0].maxAbv},
        {name: "IBU", description:"International Bitterness Unit (IBU): Measures beer bitterness from hops.",  min:filtersValues[1].minIbv, max:filtersValues[1].maxIbv},
        {name: "SRM", description:"Standard Reference Method (SRM): Quantifies beer color by measuring light absorbance.",  min:filtersValues[2].minSrm, max:filtersValues[2].maxSrm}
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
                sx={{ color: theme => theme.palette.primary.dark,
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
                min={filter.min}
                max={filter.max}
            />
        </div>
    ));

    return (
        <>
            <div className="box has-text-centered mb-3">
                <h3 className="title is-4">Filter by:</h3>
                {renderedData}
            </div>
        </>
    );
}
export default AdvancedSearch;
