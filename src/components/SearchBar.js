import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const SearchBar = ({onSearch, options}) => {
    // TODO: da passare allo store
    const [searchTerm, setSearchTerm] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleInputChange = (event, value) => {
        setSearchTerm(value);
        onSearch(searchTerm); // provare al limite con value al posto di searchterms
    };

    const navigate = useNavigate();

    const handleSubmit = (event, value) => {
        event.preventDefault();
        setSearchTerm(value);
        navigate(`/search`)
    };

    // TODO: da verificare
    const renderedOptions = options.map((option) => {
        return option.name;
    });

    return (
        <form onSubmit={handleSubmit} className="search-container">
            <Autocomplete
                freeSolo
                options={[options]}  //TODO: controllo sul tipo, dovrebbe essere un array di oggetti
                value={searchTerm}
                onInputChange={handleInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search..."
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