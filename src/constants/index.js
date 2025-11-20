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

export const STATUS_COLORS = {
    PAST: { bg: '#9ca3af', text: '#ffffff' },
    TODAY: { bg: '#e11d48', text: '#ffffff' }, // Rose 600
    TOMORROW: { bg: '#f97316', text: '#ffffff' }, // Orange 500
    THIS_WEEK: { bg: '#ffe4e6', text: '#e11d48' }, // Rose 100 bg, Rose 600 text
    FUTURE: { bg: '#f1f5f9', text: '#475569' }, // Slate 100/600
};

// Placeholder Values
export const PLACEHOLDER_VALUE = 'N/A';
