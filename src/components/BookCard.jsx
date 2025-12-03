import { Plus } from 'lucide-react';
import FlowerIcon from './FlowerIcon';
import './BookCard.css';

export default function BookCard({ book, onAdd, isAdded }) {
    const getStatusLabel = (status) => {
        if (status === 'dnf') return 'Did Not Finish';
        return status.replace(/-/g, ' ');
    };

    return (
        <div className="book-card">
            <div className="book-cover-wrapper">
                <img src={book.cover} alt={book.title} className="book-cover" />
                {onAdd && !isAdded && (
                    <button className="add-btn" onClick={() => onAdd(book)}>
                        <Plus size={20} />
                    </button>
                )}
                {isAdded && (
                    <div className={`added-badge ${book.status}`}>
                        {getStatusLabel(book.status)}
                    </div>
                )}
            </div>
            <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                {book.rating > 0 && (
                    <div className="book-rating">
                        <FlowerIcon size={14} filled={true} />
                        <span>{book.rating}/10</span>
                    </div>
                )}
            </div>
        </div>
    );
}
