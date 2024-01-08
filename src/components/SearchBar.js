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
                  width: '200px',
                  height: '30px',
                  backgroundColor: 'lightgray',
                  border: '1px solid',
                  borderColor: isHovered ? '#007bff' : 'lightgray', // Cambio del colore del bordo al passaggio del mouse
                  borderRadius: '5px',
                  padding: '5px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease-in-out',
              }}
              // Gestione evento mouseover
              onMouseOver={() => setIsHovered(true)}
              // Gestione evento mouseout
              onMouseOut={() => setIsHovered(false)}
          />
      </form>
  );
};

export default SearchBar;