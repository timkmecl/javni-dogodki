import { useState, useEffect, useMemo, useCallback } from 'react';
import { load as cheerioLoad } from 'cheerio';
import './App.css';
import Header from './components/Header';
import SearchControls from './components/SearchControls';
import EventCard from './components/EventCard';
import { SearchIcon } from './components/Icons';
import { calculateDaysUntil, matchesDateFilter } from './utils/dateUtils';
import {
  loadSearchParams,
  saveSearchParams,
  loadEventCache,
  saveEventCache,
  clearEventCache,
} from './utils/localStorageUtils';
import {
  API_URL,
  BASE_URL,
  DEFAULT_FILTER_BY,
  DEFAULT_DATE_FILTER,
  DEFAULT_LOCATION_FILTER,
  DEFAULT_SEARCH_QUERY,
  PLACEHOLDER_VALUE,
} from './constants';

function App() {
  // Load saved search params from localStorage
  const savedParams = loadSearchParams({
    searchQuery: DEFAULT_SEARCH_QUERY,
    filterBy: DEFAULT_FILTER_BY,
    locationFilter: DEFAULT_LOCATION_FILTER,
    dateFilter: DEFAULT_DATE_FILTER,
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(savedParams.searchQuery);
  const [filterBy, setFilterBy] = useState(savedParams.filterBy);
  const [locationFilter, setLocationFilter] = useState(savedParams.locationFilter);
  const [dateFilter, setDateFilter] = useState(savedParams.dateFilter);

  // Fetch events with caching support
  const fetchAllEvents = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    // Check cache first unless force refresh
    if (!forceRefresh) {
      const cachedEvents = loadEventCache();
      if (cachedEvents) {
        setEvents(cachedEvents);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const htmlText = await response.text();
      const $ = cheerioLoad(htmlText);

      const resultsDiv = $('#results');

      if (!resultsDiv || resultsDiv.length === 0) {
        console.log('No resultsDiv found');
        setEvents([]);
        setLoading(false);
        return;
      }

      const eventDivs = resultsDiv.find('.dogodek');

      const parsedEvents = eventDivs
        .map((_, eventDiv) => {
          const $eventDiv = $(eventDiv);

          const date = $eventDiv.find('.calendarBox').attr('title') || PLACEHOLDER_VALUE;

          const upperOpomnikDiv = $eventDiv.find('.upperOpomnikDiv');
          const cityRaw = upperOpomnikDiv.find('span').eq(0).text().trim() || PLACEHOLDER_VALUE;
          let region = PLACEHOLDER_VALUE;
          let city = cityRaw;
          if (cityRaw.includes('-')) {
            [region, city] = cityRaw.split('-').map((part) => part.trim());
          } else if (city.endsWith(',')) {
            city = city.slice(0, -1).trim();
          }

          const locationRaw = upperOpomnikDiv.find('span').eq(1).text() || PLACEHOLDER_VALUE;
          // if location starts with , remove it and trim
          const location = locationRaw.startsWith(',')
            ? locationRaw.slice(1).trim()
            : locationRaw.trim();

          const timeRaw = upperOpomnikDiv.next('div').contents().not('div').text().trim() || PLACEHOLDER_VALUE;
          const time = timeRaw.replace(/^ob\s+/i, '');

          const linkElement = $eventDiv.find('a');
          const url = linkElement.attr('href') || '#';
          const name = linkElement.text() || PLACEHOLDER_VALUE;

          const lessImportantDiv = $eventDiv.find('.contentOpomnik > .lessImportant');
          let extraInfo = lessImportantDiv.text().trim() || '';
          let organizer = PLACEHOLDER_VALUE;
          if (extraInfo.includes('organizator:')) {
            organizer = extraInfo.split('organizator:')[1].trim();
            extraInfo = extraInfo.split('organizator:')[0].trim();
            // remove trailing comma if exists
            if (extraInfo.endsWith(',')) {
              extraInfo = extraInfo.slice(0, -1).trim();
            }
          }

          const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${city}, ${location}`)}`;

          return { date, region, city, location, time, url, name, extraInfo, organizer, googleMapsLink };
        })
        .get();

      setEvents(parsedEvents);
      // Save to cache
      saveEventCache(parsedEvents);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load events on mount
  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  // Save search params to localStorage when they change
  useEffect(() => {
    saveSearchParams({ searchQuery, filterBy, locationFilter, dateFilter });
  }, [searchQuery, filterBy, locationFilter, dateFilter]);

  // Memoize filtered events to avoid recalculating on every render
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchLower = searchQuery.toLowerCase();
      const locationFilterLower = locationFilter.toLowerCase();

      const matchesSearch =
        event.name.toLowerCase().includes(searchLower) ||
        event.city.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.organizer.toLowerCase().includes(searchLower);

      const matchesLocationFilter =
        filterBy === 'city'
          ? event.city.toLowerCase().includes(locationFilterLower)
          : filterBy === 'region'
            ? (event.region !== PLACEHOLDER_VALUE ? event.region : event.city).toLowerCase().includes(locationFilterLower)
            : true;

      const matchesDate = matchesDateFilter(event.date, dateFilter);

      return matchesSearch && matchesLocationFilter && matchesDate;
    });
  }, [events, searchQuery, locationFilter, filterBy, dateFilter]);

  // Memoize calculateDaysUntil callback
  const calculateDaysUntilCallback = useCallback((eventDate) => {
    return calculateDaysUntil(eventDate);
  }, []);

  // Memoize unique cities and regions to avoid recalculating on every render
  const uniqueCities = useMemo(() => {
    return [...new Set(events.map((event) => event.city.toUpperCase()).filter((city) => city !== PLACEHOLDER_VALUE))];
  }, [events]);

  const uniqueRegions = useMemo(() => {
    return [...new Set(events.map((event) => event.region.toUpperCase()).filter((region) => region !== PLACEHOLDER_VALUE))];
  }, [events]);

  // Refresh handler - force fetch fresh data
  const handleRefresh = () => {
    clearEventCache();
    fetchAllEvents(true);
  };

  // Reset handler - clear all filters and reset to defaults
  const handleReset = () => {
    setSearchQuery(DEFAULT_SEARCH_QUERY);
    setFilterBy(DEFAULT_FILTER_BY);
    setLocationFilter(DEFAULT_LOCATION_FILTER);
    setDateFilter(DEFAULT_DATE_FILTER);
  };

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <SearchControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          citySuggestions={uniqueCities}
          regionSuggestions={uniqueRegions}
          onRefresh={handleRefresh}
          onReset={handleReset}
        />
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Nalagam dogodke...</p>
          </div>
        ) : error ? (
          <p className="error-message">Napaka pri nalaganju dogodkov: {error}</p>
        ) : (
          <div className="events-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={`${event.url}-${event.date}`}
                  event={event}
                  calculateDaysUntil={calculateDaysUntilCallback}
                />
              ))
            ) : (
              <div className="no-events-message">
                <SearchIcon size={48} className="no-events-icon" />
                <p>Ni najdenih dogodkov.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
