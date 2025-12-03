const BASE_URL = 'https://openlibrary.org/search.json';
const COVER_URL = 'https://covers.openlibrary.org/b/id';

export async function searchBooks(query, limit = 5) {
    if (!query) return [];

    try {
        const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&limit=${limit}&fields=key,title,author_name,cover_i`);
        const data = await response.json();

        return data.docs.map(doc => ({
            id: doc.key.replace('/works/', ''), // Use Open Library key as ID
            title: doc.title,
            author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
            cover: doc.cover_i
                ? `${COVER_URL}/${doc.cover_i}-M.jpg`
                : 'https://via.placeholder.com/128x192.png?text=No+Cover', // Fallback
            description: 'Description not available in quick search.', // Full details would need another call
            rating: 0 // API doesn't provide rating in search easily
        }));
    } catch (error) {
        console.error('Error searching books:', error);
        return [];
    }
}
