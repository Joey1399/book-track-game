import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import { GameProvider } from './context/GameContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Layout from './components/Layout';
import Home from './pages/Home';
import BookSearch from './pages/BookSearch';
import MyBooks from './pages/MyBooks';
import Game from './pages/Game';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <BookProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<BookSearch />} />
                <Route path="/books" element={<MyBooks />} />
                <Route path="/game" element={<Game />} />
              </Routes>
              <ThemeToggle />
            </Layout>
          </BrowserRouter>
        </BookProvider>
      </GameProvider>
    </ThemeProvider>
  )
}

export default App
