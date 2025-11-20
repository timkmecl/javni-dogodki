import { memo } from 'react';
import { TicketIcon } from './Icons';

const Header = () => {
  return (
    <header className="App-header">
      <div className="header-content">
        <TicketIcon className="header-icon" />
        <h1>Javni dogodki</h1>
      </div>
    </header>
  );
};

export default memo(Header);
