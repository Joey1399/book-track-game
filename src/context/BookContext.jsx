import { createContext, useContext, useState, useEffect } from 'react';
import { useGame } from './GameContext';

const BookContext = createContext();

export function useBooks() {
    return useContext(BookContext);
}

export function BookProvider({ children }) {
    const { addXp, unlockReward } = useGame();
    const [books, setBooks] = useState(() => {
        const saved = localStorage.getItem('bookquest_books');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('bookquest_books', JSON.stringify(books));
    }, [books]);

    const addBook = (bookData) => {
        setBooks(prev => {
            // Check if book already exists
            if (prev.find(b => b.id === bookData.id)) return prev;

            // Award XP if adding as finished immediately
            if (bookData.status === 'finished') {
                addXp(50);
                if (bookData.review) addXp(20);

                const reward = unlockReward();
                if (reward) {
                    setTimeout(() => alert(`You unlocked a new reward: ${reward.name}! Check the Game tab.`), 0);
                }
            }

            return [...prev, { ...bookData, dateAdded: new Date().toISOString() }];
        });
    };

    const updateBookStatus = (bookId, status) => {
        setBooks(prev => prev.map(book => {
            if (book.id === bookId) {
                // Award XP if finishing for the first time
                if (status === 'finished' && book.status !== 'finished') {
                    addXp(50);
                    const reward = unlockReward();
                    if (reward) {
                        setTimeout(() => alert(`You unlocked a new reward: ${reward.name}! Check the Game tab.`), 0);
                    }
                }
                return { ...book, status };
            }
            return book;
        }));
    };

    const addReview = (bookId, rating, review) => {
        setBooks(prev => prev.map(book => {
            if (book.id === bookId) {
                if (book.status !== 'finished') {
                    addXp(50); // Base finish XP
                    const reward = unlockReward();
                    if (reward) {
                        setTimeout(() => alert(`You unlocked a new reward: ${reward.name}! Check the Game tab.`), 0);
                    }
                }
                addXp(20); // Review bonus
                return { ...book, rating, review, status: 'finished' };
            }
            return book;
        }));
    };

    const removeBook = (bookId) => {
        setBooks(prev => prev.filter(book => book.id !== bookId));
    };

    const getBooksByStatus = (status) => {
        return books.filter(book => book.status === status);
    };

    const value = {
        books,
        addBook,
        updateBookStatus,
        addReview,
        removeBook,
        getBooksByStatus
    };

    return (
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    );
}
