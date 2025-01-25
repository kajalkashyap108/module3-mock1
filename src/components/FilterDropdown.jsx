import React from 'react';
import '../styles/FilterDropdown.css';

const FilterDropdown = ({ onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="filter-dropdown">
      <select onChange={handleChange}>
        <option value="">All Departments</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
