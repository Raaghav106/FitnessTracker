import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const FilterComponent = () => {
  const [filterType, setFilterType] = useState('artist');
  const [filterValue, setFilterValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/songs?type=${filterType}&value=${filterValue}`);
  };

  return (
    <div className="filter-container">
      <h1>Music Filter</h1>
      <div>
        <label>
          Filter By:
          <select
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option value="artist">Artist</option>
            <option value="genre">Genre</option>
            <option value="mood">Mood</option>
          </select>
        </label>
      </div>
      <div>
        <input
          type="text"
          placeholder={`Search ${filterType}`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default FilterComponent;
