import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const SearchBar = ({onSearch, handleSubmit, options, label}) => {

    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")

    const handleInputChange = (event, value) => {
        setSearchTerm(value);
        onSearch(value);
    };

    const renderedOptions = options.map((option) => {
        return option.name;
    });

    return (
        <form onSubmit={handleSubmit} className="search-container">
            <Autocomplete
                freeSolo
                options={renderedOptions}
                value={searchTerm}
                onInputChange={handleInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        variant="outlined"
                        style={{
                            width: isHovered ?'400px': '380px',
                            backgroundColor: isHovered ? '#eaeffa' : '#fafafc',
                            borderRadius: '5px',
                            transition: 'background-color 0.3s ease-in-out',
                            fontSize: '14px',
                            color: '#858484',
                            fontStyle: 'italic',
                            fontFamily: 'Arial, sans-serif',
                        }}
                        InputProps={{
                            ...params.InputProps,
                            onMouseOver: () => setIsHovered(true),
                            onMouseOut: () => setIsHovered(false),
                        }}
                    />
                )}
            />
        </form>
    );
};

export default SearchBar;