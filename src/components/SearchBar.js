import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
      <form onSubmit={handleSubmit} className="search-container">
          <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              className="search-input"
              style={{
                  width: '250px',
                  height: '30px',
                  backgroundColor: isHovered ? '#eaeffa' :'#fafafc',
                  border: '1px solid',
                  borderColor: 'lightgray',
                  borderRadius: '5px',
                  padding: '5px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease-in-out',
                  fontSize: '14px',
                  color: '#858484',
                  fontStyle: 'italic',
                  fontFamily: 'Arial, sans-serif',
              }}
              // mouseover event
              onMouseOver={() => setIsHovered(true)}
              // mouseout event
              onMouseOut={() => setIsHovered(false)}
          />
      </form>
  );
};

export default SearchBar;