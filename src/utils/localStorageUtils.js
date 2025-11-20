/**
 * LocalStorage utility functions for session persistence and caching
 */

const STORAGE_KEYS = {
    SEARCH_PARAMS: 'events_search_params',
    EVENT_CACHE: 'events_cache',
};

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Save search parameters to localStorage
 * @param {Object} params - Search parameters to save
 * @param {string} params.searchQuery - Search query string
 * @param {string} params.filterBy - Filter type (all, city, region)
 * @param {string} params.locationFilter - Location filter value
 * @param {string} params.dateFilter - Date filter value
 */
export const saveSearchParams = ({ searchQuery, filterBy, locationFilter, dateFilter }) => {
    try {
        const params = { searchQuery, filterBy, locationFilter, dateFilter };
        localStorage.setItem(STORAGE_KEYS.SEARCH_PARAMS, JSON.stringify(params));
    } catch (error) {
        console.error('Error saving search params to localStorage:', error);
    }
};

/**
 * Load search parameters from localStorage
 * @param {Object} defaults - Default values to use if no saved params
 * @returns {Object} Search parameters
 */
export const loadSearchParams = (defaults) => {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.SEARCH_PARAMS);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (error) {
        console.error('Error loading search params from localStorage:', error);
    }
    return defaults;
};

/**
 * Save events to cache with timestamp
 * @param {Array} events - Array of event objects to cache
 */
export const saveEventCache = (events) => {
    try {
        const cache = {
            events,
            timestamp: Date.now(),
        };
        localStorage.setItem(STORAGE_KEYS.EVENT_CACHE, JSON.stringify(cache));
    } catch (error) {
        console.error('Error saving event cache to localStorage:', error);
    }
};

/**
 * Load events from cache if valid (not expired)
 * @returns {Array|null} Cached events or null if cache is invalid/expired
 */
export const loadEventCache = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.EVENT_CACHE);
        if (saved) {
            const cache = JSON.parse(saved);
            const now = Date.now();
            const age = now - cache.timestamp;

            if (age < CACHE_DURATION) {
                console.log(`Loading events from cache (age: ${Math.round(age / 1000)}s)`);
                return cache.events;
            } else {
                console.log('Event cache expired, will fetch fresh data');
                clearEventCache();
            }
        }
    } catch (error) {
        console.error('Error loading event cache from localStorage:', error);
    }
    return null;
};

/**
 * Clear event cache from localStorage
 */
export const clearEventCache = () => {
    try {
        localStorage.removeItem(STORAGE_KEYS.EVENT_CACHE);
    } catch (error) {
        console.error('Error clearing event cache from localStorage:', error);
    }
};

/**
 * Clear all saved data (search params and cache)
 */
export const clearAllStorage = () => {
    clearEventCache();
    try {
        localStorage.removeItem(STORAGE_KEYS.SEARCH_PARAMS);
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};
