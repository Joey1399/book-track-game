import { useState } from 'react';
import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';
import BookLoggingModal from '../components/BookLoggingModal';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MyBooks.css';

export default function MyBooks() {
    const { books, getBooksByStatus, addBook, removeBook } = useBooks();
    const [activeTab, setActiveTab] = useState('all');
    const [editingBook, setEditingBook] = useState(null);
    const navigate = useNavigate();

    const tabs = [
        { id: 'all', label: 'All Books' },
        { id: 'want-to-read', label: 'Want to Read' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'finished', label: 'Finished' },
        { id: 'dnf', label: 'Did Not Finish' }
    ];

    const handleSaveBook = (bookData) => {
        removeBook(bookData.id);
        addBook(bookData);
        setEditingBook(null);
    };

    const handleDeleteBook = (bookId) => {
        removeBook(bookId);
        setEditingBook(null);
    };

    const renderBookGrid = (bookList) => (
        <div className="books-grid">
            {bookList.map(book => (
                <div key={book.id} onClick={() => setEditingBook(book)} style={{ cursor: 'pointer' }}>
                    <BookCard book={book} isAdded={true} />
                </div>
            ))}
        </div>
    );

    const renderAllBooks = () => {
        const sections = tabs.filter(t => t.id !== 'all');

        return (
            <div className="all-books-container">
                {sections.map(section => {
                    const sectionBooks = getBooksByStatus(section.id);
                    if (sectionBooks.length === 0) return null;

                    return (
                        <div key={section.id} className="book-section">
                            <h2 className="section-title">{section.label}</h2>
                            {renderBookGrid(sectionBooks)}
                        </div>
                    );
                })}
                {books.length === 0 && (
                    <div className="empty-state">
                        <p>No books in your library yet.</p>
                        <button className="browse-btn" onClick={() => navigate('/')}>Find Books</button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="my-books-page">
            <div className="books-header">
                <h1>My Library</h1>
                <button className="add-book-btn" onClick={() => navigate('/')}>
                    <Plus size={20} />
                    <span>Add Book</span>
                </button>
            </div>

            <div className="tabs-container">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="books-content">
                {activeTab === 'all' ? (
                    renderAllBooks()
                ) : (
                    <>
                        {getBooksByStatus(activeTab).length > 0 ? (
                            renderBookGrid(getBooksByStatus(activeTab))
                        ) : (
                            <div className="empty-state">
                                <p>No books in this category yet.</p>
                                <button className="browse-btn" onClick={() => navigate('/')}>Find Books</button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {editingBook && (
                <BookLoggingModal
                    book={editingBook}
                    onClose={() => setEditingBook(null)}
                    onSave={handleSaveBook}
                    onDelete={handleDeleteBook}
                />
            )}
        </div>
    );
}
