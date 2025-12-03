import { useState } from 'react';
import FlowerIcon from './FlowerIcon';
import './StarRating.css';

export default function StarRating({ rating, onRatingChange, readOnly = false, maxRating = 5 }) {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="star-rating">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`star-btn ${readOnly ? 'readonly' : ''} ${(hoverRating || rating) >= star ? 'filled' : ''}`}
                    onClick={() => !readOnly && onRatingChange(star)}
                    onMouseEnter={() => !readOnly && setHoverRating(star)}
                    onMouseLeave={() => !readOnly && setHoverRating(0)}
                    disabled={readOnly}
                >
                    <FlowerIcon size={24} filled={(hoverRating || rating) >= star} />
                </button>
            ))}
        </div>
    );
}
