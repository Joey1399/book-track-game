import { useState } from 'react';
import { X } from 'lucide-react';
import StarRating from './StarRating';
import './BookLoggingModal.css';

export default function BookLoggingModal({ book, onClose, onSave, onDelete }) {
    const [status, setStatus] = useState(book.status || 'want-to-read');
    const [rating, setRating] = useState(book.rating || 0);
    const [review, setReview] = useState(book.review || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...book,
            status,
            rating: status === 'finished' ? rating : 0,
            review: status === 'finished' || status === 'dnf' ? review : '',
            dateAdded: book.dateAdded || new Date().toISOString(),
            dateFinished: status === 'finished' ? (book.dateFinished || new Date().toISOString()) : null
        });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to remove this book from your library?')) {
            onDelete(book.id);
            onClose();
        }
    };

    if (!book) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <img src={book.cover} alt={book.title} className="modal-book-cover" />
                    <div className="modal-book-info">
                        <h2>{book.title}</h2>
                        <p className="author">{book.author}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="logging-form">
                    <div className="form-group">
                        <label>Status</label>
                        <div className="status-options">
                            {[
                                { id: 'want-to-read', label: 'Want to Read' },
                                { id: 'in-progress', label: 'In Progress' },
                                { id: 'finished', label: 'Finished' },
                                { id: 'dnf', label: 'Did Not Finish' }
                            ].map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    className={`status-chip ${status === opt.id ? 'active' : ''}`}
                                    onClick={() => setStatus(opt.id)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {status === 'finished' && (
                        <>
                            <div className="form-group">
                                <label>Rating (Flowers)</label>
                                <StarRating rating={rating} onRatingChange={setRating} maxRating={10} />
                            </div>

                            <div className="form-group">
                                <label>Review</label>
                                <textarea
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="What did you think?"
                                    rows={4}
                                />
                            </div>
                        </>
                    )}

                    {status === 'dnf' && (
                        <div className="form-group">
                            <label>Explanation</label>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Why did you stop?"
                                rows={4}
                            />
                        </div>
                    )}

                    <div className="modal-actions">
                        {onDelete && (
                            <button type="button" className="delete-btn" onClick={handleDelete}>
                                Delete
                            </button>
                        )}
                        <button type="submit" className="save-btn">
                            Save to Library
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
