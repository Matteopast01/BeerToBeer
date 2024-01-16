import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleInputChange = (event, value) => {
        setSearchTerm(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} className="search-container">
            <Autocomplete
                freeSolo
                options={[]}  // Add your autocomplete options here
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
