/**
 * Application constants
 */

// API Configuration
export const API_URL = 'https://e-uprava.gov.si/si/aktualno/prireditve-in-shodi/content/singleton.html?lang=si&type=-&perioda=-&posta=-1&offset=0&sentinel_type=ok&sentinel_status=ok&is_ajax=1&complete=true&page=30';
export const BASE_URL = 'https://e-uprava.gov.si';

// Filter Types
export const FILTER_TYPES = {
    ALL: 'all',
    CITY: 'city',
    REGION: 'region',
};

// Date Filter Options
export const DATE_FILTERS = {
    TODAY: 'today',
    TOMORROW: 'tomorrow',
    THIS_WEEK: 'thisweek',
    THIS_MONTH: 'thismonth',
    ALL: 'all',
};

// Default Values
export const DEFAULT_FILTER_BY = FILTER_TYPES.ALL;
export const DEFAULT_DATE_FILTER = DATE_FILTERS.THIS_WEEK;
export const DEFAULT_LOCATION_FILTER = '';
export const DEFAULT_SEARCH_QUERY = '';

// Event Status Colors
export const STATUS_COLORS = {
    PAST: '#e74c3c',
    TODAY: '#2ecc71',
    FUTURE: '#f39c12',
};

// Placeholder Values
export const PLACEHOLDER_VALUE = 'N/A';
