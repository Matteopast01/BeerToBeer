import {useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {TextField} from '@mui/material';

const SearchBar = ({onSearch, handleSubmit, handleClick, options, label}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event, value) => {
        setSearchTerm(value);
        onSearch(value);
    };

    const renderedOptions = options.map((option) => {
        return option.name;
    });

    const newHandleSubmit = (searchTerm, event) => {
        handleSubmit(searchTerm, event);
        setSearchTerm("")
    }

    return (
        <form onSubmit={(event) => newHandleSubmit(searchTerm, event)} className="search-container">
            <Autocomplete
                freeSolo
                options={renderedOptions}
                value={searchTerm}
                onInputChange={handleInputChange}
                onChange={(event, value)=> {
                    handleClick(value)
                }}
                renderInput={(params) => (
                    <TextField
                        color="secondary"
                        {...params}
                        label={label}
                        variant="outlined"
                        style={{
                            width: '400px',
                            backgroundColor: isHovered ? '#eaeffa' : '#fafafc',
                            borderRadius: '3px',
                            transition: 'background-color 0.1s ease-in-out',
                            fontSize: '14px',
                            fontStyle: 'italic',
                            fontFamily: 'Arial, sans-serif',
                            //"&:hover": {borderColor: "error", color: "error"}
                            // borderColor: '#2e7d32',
                            // color: theme.palette.warning.main
                        }}
                        InputProps={{
                            ...params.InputProps,
                            onMouseOver: () => setIsHovered(true),
                            onMouseOut: () => setIsHovered(false),
                            onBlur: () => setSearchTerm(""),
                            // for letters coloring
                           // style: {color: theme.palette.warning.main},
                        }}
                    />
                )}
            />
        </form>
    );
};

export default SearchBar;
