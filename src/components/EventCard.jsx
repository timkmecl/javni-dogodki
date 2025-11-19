import { memo } from 'react';
import PropTypes from 'prop-types';
import { STATUS_COLORS, PLACEHOLDER_VALUE, BASE_URL } from '../constants';

const EventCard = ({ event, calculateDaysUntil }) => {
  const daysUntil = calculateDaysUntil(event.date);

  const getStatusColor = () => {
    if (daysUntil < 0) return STATUS_COLORS.PAST;
    if (daysUntil === 0) return STATUS_COLORS.TODAY;
    return STATUS_COLORS.FUTURE;
  };

  const getStatusText = () => {
    if (daysUntil > 0) return `${daysUntil} dni do dogodka`;
    if (daysUntil === 0) return 'Danes';
    return `Končano pred ${Math.abs(daysUntil)} dnevi`;
  };

  return (
    <div className="event-card">
      <h2>{event.name}</h2>

      <div className="event-date-time-status">
        <span className="event-date">{event.date}</span>
        {event.time && event.time !== PLACEHOLDER_VALUE && <span className="event-time"> &bull; {event.time}</span>}
        <span
          className="event-status"
          style={{ backgroundColor: getStatusColor() }}
        >
          {getStatusText()}
        </span>
      </div>

      <div className="event-location-info">
        <span className="event-city-region">
          {event.city}
          {event.region && event.region !== PLACEHOLDER_VALUE && event.region !== event.city && ` (${event.region})`}
        </span>
        {event.location && event.location !== PLACEHOLDER_VALUE && event.location !== event.city && (
          <>
            {' \u2022 '}
            <a href={event.googleMapsLink} target="_blank" rel="noopener noreferrer" className="event-location-link">
              {event.location}
            </a>
          </>
        )}
      </div>

      {event.organizer && event.organizer !== PLACEHOLDER_VALUE && (
        <p className="event-organizer">
          <small><em>{event.organizer}</em></small>
        </p>
      )}

      <div className="event-footer">
        <button
          onClick={() => {
            const query = encodeURIComponent(`${event.name} ${event.location} ${event.date}`);
            window.open(`https://www.google.com/search?q=${query}`, '_blank');
          }}
          className="google-search-button"
          aria-label="Išči dogodek na Google"
        >
          Išči
        </button>

        <button
          onClick={() => {
            window.open(`${BASE_URL}/${event.url}`, '_blank');
          }}
          className="details-button"
          aria-label="Več podrobnosti o dogodku"
        >
          Več podrobnosti
        </button>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string,
    city: PropTypes.string.isRequired,
    region: PropTypes.string,
    location: PropTypes.string,
    organizer: PropTypes.string,
    url: PropTypes.string.isRequired,
    googleMapsLink: PropTypes.string.isRequired,
  }).isRequired,
  calculateDaysUntil: PropTypes.func.isRequired,
};

export default memo(EventCard);
