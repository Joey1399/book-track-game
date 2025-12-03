import { useState } from 'react';
import { Search } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { mockBooks } from '../utils/mockBooks';
import BookCard from '../components/BookCard';
import './BookSearch.css';

export default function BookSearch() {
    const [query, setQuery] = useState('');
    const { addBook, books } = useBooks();

    const filteredBooks = mockBooks.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );

    const handleAddBook = (book) => {
        // Default to 'want-to-read' for now, could be a modal selection
        addBook(book, 'want-to-read');
    };

    const isBookAdded = (bookId) => {
        return books.some(b => b.id === bookId);
    };

    return (
        <div className="search-page">
            <div className="search-header">
                <h2>Find Your Next Adventure</h2>
                <div className="search-bar">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="books-grid">
                {filteredBooks.map(book => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onAdd={handleAddBook}
                        isAdded={isBookAdded(book.id)}
                    />
                ))}
            </div>

            {filteredBooks.length === 0 && (
                <div className="no-results">
                    <p>No books found matching "{query}"</p>
                </div>
            )}
        </div>
    );
}
