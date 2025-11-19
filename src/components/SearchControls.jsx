import { memo } from 'react';
import PropTypes from 'prop-types';

const SearchControls = ({
  searchQuery,
  setSearchQuery,
  filterBy,
  setFilterBy,
  locationFilter,
  setLocationFilter,
  dateFilter,
  setDateFilter,
  citySuggestions,
  regionSuggestions
}) => {
  const suggestions = filterBy === 'city' ? citySuggestions : filterBy === 'region' ? regionSuggestions : [];

  return (
    <div className="controls-container">
      <div className="search-interface">
        <input
          type="text"
          placeholder="Išči dogodke..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Išči dogodke po imenu, mestu, lokaciji ali organizatorju"
        />
      </div>
      <div className="filter-interface">
        <div className="filter-group location-type-filter" role="radiogroup" aria-label="Tip filtra lokacije">
          <label>
            <input
              type="radio"
              value="all"
              checked={filterBy === 'all'}
              onChange={() => setFilterBy('all')}
              aria-label="Prikaži vse dogodke"
            />
            Vse
          </label>
          <label>
            <input
              type="radio"
              value="city"
              checked={filterBy === 'city'}
              onChange={() => setFilterBy('city')}
              aria-label="Filtriraj po mestu"
            />
            Mesto
          </label>
          <label>
            <input
              type="radio"
              value="region"
              checked={filterBy === 'region'}
              onChange={() => setFilterBy('region')}
              aria-label="Filtriraj po regiji"
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
          list="location-suggestions"
          disabled={filterBy === 'all'}
          aria-label="Vnesi lokacijo za filtriranje"
        />
        <datalist id="location-suggestions">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
        <select
          className="date-filter-select"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          aria-label="Izberi časovno obdobje"
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

SearchControls.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  filterBy: PropTypes.string.isRequired,
  setFilterBy: PropTypes.func.isRequired,
  locationFilter: PropTypes.string.isRequired,
  setLocationFilter: PropTypes.func.isRequired,
  dateFilter: PropTypes.string.isRequired,
  setDateFilter: PropTypes.func.isRequired,
  citySuggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  regionSuggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default memo(SearchControls);
