export const EditIcon = ({ width = 20, height = 20, fill = "currentColor", className = "", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
);

export const TrashIcon = ({ width = 20, height = 20, fill = "currentColor", className = "", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
    </svg>
);
