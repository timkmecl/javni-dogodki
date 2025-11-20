import PropTypes from 'prop-types';

const IconWrapper = ({ children, className, size = 20, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`icon ${className || ''}`}
        {...props}
    >
        {children}
    </svg>
);

IconWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    size: PropTypes.number,
};

export const SearchIcon = (props) => (
    <IconWrapper {...props}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </IconWrapper>
);

export const MapPinIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </IconWrapper>
);

export const CalendarIcon = (props) => (
    <IconWrapper {...props}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </IconWrapper>
);

export const ClockIcon = (props) => (
    <IconWrapper {...props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </IconWrapper>
);

export const ExternalLinkIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </IconWrapper>
);

export const FilterIcon = (props) => (
    <IconWrapper {...props}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </IconWrapper>
);

export const ChevronDownIcon = (props) => (
    <IconWrapper {...props}>
        <polyline points="6 9 12 15 18 9" />
    </IconWrapper>
);

export const GoogleIcon = (props) => (
    <IconWrapper {...props} fill="currentColor" stroke="none">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12s5.333 12 11.947 12c3.653 0 6.493-1.2 8.4-3.2 2.013-2.013 2.613-5.067 2.613-7.64 0-.76-.067-1.467-.173-2.24H12.48z" />
    </IconWrapper>
);

export const SparklesIcon = (props) => (
    <IconWrapper {...props}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </IconWrapper>
);

export const TicketIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M13 5v2" />
        <path d="M13 17v2" />
        <path d="M13 11v2" />
    </IconWrapper>
);
