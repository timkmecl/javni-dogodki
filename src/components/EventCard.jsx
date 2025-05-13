import React from 'react';

const EventCard = ({ event, calculateDaysUntil }) => {
  const daysUntil = calculateDaysUntil(event.date);

  return (
    <div className="event-card">
      <h2>{event.name}</h2>

      <div className="event-date-time-status">
        <span className="event-date">{event.date}</span>
        {event.time && event.time !== 'N/A' && <span className="event-time"> &bull; {event.time}</span>}
        <span className="event-status" style={{
          marginLeft: '10px',
          fontSize: '0.9em',
          fontWeight: '500',
          padding: '2px 6px',
          borderRadius: '4px',
          color: 'white',
          backgroundColor: daysUntil < 0 ? '#e74c3c' : (daysUntil === 0 ? '#2ecc71' : '#f39c12')
        }}>
          {daysUntil > 0 ? `${daysUntil} dni do dogodka` : daysUntil === 0 ? 'Danes' : `Končano pred ${Math.abs(daysUntil)} dnevi`}
        </span>
      </div>

      <div className="event-location-info">
        <span className="event-city-region">
          {event.city}
          {event.region && event.region !== 'N/A' && event.region !== event.city && ` (${event.region})`}
        </span>
        {event.location && event.location !== 'N/A' && event.location !== event.city && (
          <>
            {' \u2022 '}
            <a href={event.googleMapsLink} target="_blank" rel="noopener noreferrer" className="event-location-link">
              {event.location}
            </a>
          </>
        )}
      </div>

      {event.organizer && event.organizer !== 'N/A' && (
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
          style={{
            marginRight: '10px',
            padding: '10px 15px',
            fontSize: '1em',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          Išči
        </button>

        <button
          onClick={() => {
            window.open(`https://e-uprava.gov.si/${event.url}`, '_blank');
          }}
          className="details-button"
          style={{
            padding: '5px 10px',
            fontSize: '0.9em',
            cursor: 'pointer',
          }}
        >
          Več podrobnosti
        </button>
      </div>
    </div>
  );
};

export default EventCard;
