import { useState, useEffect } from 'react';
import { load as cheerioLoad } from 'cheerio';
import './App.css';
import Header from './components/Header';
import SearchControls from './components/SearchControls';
import EventCard from './components/EventCard';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // New state for filter option
  const [locationFilter, setLocationFilter] = useState(''); // New state for location filter
  const [dateFilter, setDateFilter] = useState('thisweek'); // New state for date filter

  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://e-uprava.gov.si/si/aktualno/prireditve-in-shodi/content/singleton.html?lang=si&type=-&perioda=-&posta=-1&offset=0&sentinel_type=ok&sentinel_status=ok&is_ajax=1&complete=true&page=30`
        );
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

            const date = $eventDiv.find('.calendarBox').attr('title') || 'N/A';

            const upperOpomnikDiv = $eventDiv.find('.upperOpomnikDiv');
            const cityRaw = upperOpomnikDiv.find('span').eq(0).text().trim() || 'N/A';
            let region = 'N/A';
            let city = cityRaw;
            if (cityRaw.includes('-')) {
              [region, city] = cityRaw.split('-').map((part) => part.trim());
            } else if (city.endsWith(',')) {
              city = city.slice(0, -1).trim();
            }
            
            const locationRaw = upperOpomnikDiv.find('span').eq(1).text() || 'N/A';
            // if location starts with , remove it and trim
            const location = locationRaw.startsWith(',')
              ? locationRaw.slice(1).trim()
              : locationRaw.trim();

            const time = upperOpomnikDiv.next('div').contents().not('div').text().trim() || 'N/A';

            const linkElement = $eventDiv.find('a');
            const url = linkElement.attr('href') || '#';
            const name = linkElement.text() || 'N/A';

            const lessImportantDiv = $eventDiv.find('.contentOpomnik > .lessImportant');
            let extraInfo = lessImportantDiv.text().trim() || '';
            let organizer = 'N/A';
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
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
        ? (event.region !== 'N/A' ? event.region : event.city).toLowerCase().includes(locationFilterLower)
        : true;

    const matchesDateFilter = (() => {
      const [day, month, year] = event.date.split('.').map(Number);
      const eventDate = new Date(year, month - 1, day);
      const today = new Date();

      switch (dateFilter) {
        case 'today':
          return (
            eventDate.getDate() === today.getDate() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        case 'tomorrow':
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          return (
            eventDate.getDate() === tomorrow.getDate() &&
            eventDate.getMonth() === tomorrow.getMonth() &&
            eventDate.getFullYear() === tomorrow.getFullYear()
          );
        case 'thisweek':
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        case 'thismonth':
          return (
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        case 'all':
        default:
          return true;
      }
    })();

    return matchesSearch && matchesLocationFilter && matchesDateFilter;
  });

  const calculateDaysUntil = (eventDate) => {
    const [day, month, year] = eventDate.split('.').map(Number);
    const eventDateObj = new Date(year, month - 1, day);
    const today = new Date();
    const diffTime = eventDateObj - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  const uniqueCities = [...new Set(events.map((event) => event.city.toUpperCase()).filter((city) => city !== 'N/A'))];
  const uniqueRegions = [...new Set(events.map((event) => event.region.toUpperCase()).filter((region) => region !== 'N/A'))];

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
          citySuggestions={uniqueCities} // Pass city suggestions
          regionSuggestions={uniqueRegions} // Pass region suggestions
        />
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Nalagam dogodke...</p>
          </div>
        ) : error ? (
          <p>Napaka pri nalaganju dogodkov: {error}</p>
        ) : (
          <div className="events-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <EventCard key={index} event={event} calculateDaysUntil={calculateDaysUntil} />
              ))
            ) : (
              <p>Ni najdenih dogodkov.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
