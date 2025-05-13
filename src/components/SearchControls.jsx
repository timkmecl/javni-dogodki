import React from 'react';

const SearchControls = ({ searchQuery, setSearchQuery, filterBy, setFilterBy, locationFilter, setLocationFilter, dateFilter, setDateFilter }) => {
  return (
    <div className="controls-container">
      <div className="search-interface">
        <input
          type="text"
          placeholder="Išči dogodke..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="filter-interface">
        <div className="filter-group location-type-filter">
          <label>
            <input
              type="radio"
              value="all"
              checked={filterBy === 'all'}
              onChange={() => setFilterBy('all')}
            />
            Vse
          </label>
          <label>
            <input
              type="radio"
              value="city"
              checked={filterBy === 'city'}
              onChange={() => setFilterBy('city')}
            />
            Mesto
          </label>
          <label>
            <input
              type="radio"
              value="region"
              checked={filterBy === 'region'}
              onChange={() => setFilterBy('region')}
            />
            Regija
          </label>
        </div>
        <input
          className="location-filter-input"
          type="text"
          placeholder="Filtriraj po lokaciji..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          disabled={filterBy === 'all'}
        />
        <select
          className="date-filter-select"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="today">Danes</option>
          <option value="tomorrow">Jutri</option>
          <option value="thisweek">Ta teden</option>
          <option value="thismonth">Ta mesec</option>
          <option value="all">Vsi datumi</option>
        </select>
      </div>
    </div>
  );
};

export default SearchControls;
