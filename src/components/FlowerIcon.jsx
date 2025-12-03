export default function FlowerIcon({ size = 24, className = "", filled = true }) {
    const colors = filled ? {
        stem: "#4ade80",
        petalFill: "#fde047",
        petalStroke: "#eab308",
        center: "#854d0e"
    } : {
        stem: "#d1d5db", // gray-300
        petalFill: "transparent",
        petalStroke: "#d1d5db", // gray-300
        center: "#d1d5db" // gray-300
    };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Stem */}
            <path
                d="M12 22V12"
                stroke={colors.stem}
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Petals */}
            <path
                d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                fill={colors.petalFill}
                stroke={colors.petalStroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0, -2)"
            />
            <path
                d="M12 12C14.2091 12 16 13.7909 16 16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16C8 13.7909 9.79086 12 12 12Z"
                fill={colors.petalFill}
                stroke={colors.petalStroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0, 2)"
            />
            <path
                d="M12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12Z"
                fill={colors.petalFill}
                stroke={colors.petalStroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(2, 0)"
            />
            <path
                d="M12 12C12 14.2091 10.2091 16 8 16C5.79086 16 4 14.2091 4 12C4 9.79086 5.79086 8 8 8C10.2091 8 12 9.79086 12 12Z"
                fill={colors.petalFill}
                stroke={colors.petalStroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-2, 0)"
            />

            {/* Center */}
            <circle cx="12" cy="12" r="2.5" fill={colors.center} />
        </svg>
    );
}
