import { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { searchBooks } from '../utils/api';
import BookLoggingModal from '../components/BookLoggingModal';
import './Home.css';

export default function Home() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const navigate = useNavigate();
    const { addBook } = useBooks();
    const wrapperRef = useRef(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length > 2) {
                setIsLoading(true);
                const results = await searchBooks(query);
                setSuggestions(results);
                setIsLoading(false);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    // Close suggestions on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    const handleSelectBook = (book) => {
        setSelectedBook(book);
        setShowSuggestions(false);
    };

    const handleSaveBook = (bookData) => {
        addBook(bookData);
        setSelectedBook(null);
        setQuery('');
        navigate('/books');
    };

    return (
        <div className="home-page">
            <div className="hero-section">
                <h1 className="hero-title">What can I help with?</h1>

                <div className="hero-search-container" ref={wrapperRef}>
                    <form onSubmit={handleSearch} className="search-input-wrapper">
                        <input
                            type="text"
                            className="hero-search-input"
                            placeholder="Begin playing BookQuest by logging a book here..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => query.length > 2 && setShowSuggestions(true)}
                            autoFocus
                        />
                        <div className="search-actions">
                            {isLoading ? (
                                <Loader2 size={16} className="animate-spin text-secondary" />
                            ) : (
                                <button type="submit" className="action-pill">
                                    <Search size={14} />
                                    <span>Search</span>
                                </button>
                            )}
                        </div>
                    </form>

                    {showSuggestions && suggestions.length > 0 && (
                        <div className="suggestions-dropdown">
                            {suggestions.map(book => (
                                <div
                                    key={book.id}
                                    className="suggestion-item"
                                    onClick={() => handleSelectBook(book)}
                                >
                                    <img src={book.cover} alt={book.title} className="suggestion-cover" />
                                    <div className="suggestion-info">
                                        <div className="suggestion-title">{book.title}</div>
                                        <div className="suggestion-author">{book.author}</div>
                                    </div>
                                    <button className="suggestion-add-btn">
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedBook && (
                <BookLoggingModal
                    book={selectedBook}
                    onClose={() => setSelectedBook(null)}
                    onSave={handleSaveBook}
                />
            )}
        </div>
    )
}
