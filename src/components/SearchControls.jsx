import { memo } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon, MapPinIcon, CalendarIcon, RefreshIcon, XCircleIcon } from './Icons';

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
  regionSuggestions,
  onRefresh,
  onReset,
}) => {
  const suggestions = filterBy === 'city' ? citySuggestions : filterBy === 'region' ? regionSuggestions : [];

  return (
    <div className="search-controls-wrapper">
      <div className="controls-container">
        <div className="search-interface">
          <div className="input-with-icon">
            <SearchIcon className="input-icon" size={20} />
            <input
              type="text"
              placeholder="Išči dogodke..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Išči dogodke po imenu, mestu, lokaciji ali organizatorju"
            />
          </div>
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

          <div className={`input-with-icon ${filterBy === 'all' ? 'hidden' : ''}`}>
            <MapPinIcon className="input-icon" size={18} />
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
          </div>
          <datalist id="location-suggestions">
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>

          <div className="select-with-icon">
            <CalendarIcon className="input-icon" size={18} />
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
      </div>

      <div className="action-buttons-outside">
        <button
          className="action-button-small"
          onClick={onRefresh}
          aria-label="Osveži seznam dogodkov"
          title="Osveži seznam dogodkov"
        >
          <RefreshIcon size={14} />
          <span>Osveži</span>
        </button>
        <button
          className="action-button-small"
          onClick={onReset}
          aria-label="Ponastavi filtre"
          title="Ponastavi filtre"
        >
          <XCircleIcon size={14} />
          <span>Ponastavi</span>
        </button>
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
  onRefresh: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default memo(SearchControls);
