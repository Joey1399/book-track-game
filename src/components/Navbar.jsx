import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Gamepad2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import './Navbar.css';

export default function Navbar() {
    const location = useLocation();
    const { pendingRewards } = useGame();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="logo">
                    <BookOpen className="logo-icon" />
                    <span>BookQuest</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                        <Home size={20} />
                        <span>Home</span>
                    </Link>
                    <Link to="/books" className={`nav-link ${isActive('/books') ? 'active' : ''}`}>
                        <BookOpen size={20} />
                        <span>My Books</span>
                    </Link>
                    <Link to="/game" className={`nav-link ${isActive('/game') ? 'active' : ''}`}>
                        <div className="nav-icon-wrapper">
                            <Gamepad2 size={20} />
                            {pendingRewards > 0 && <span className="nav-badge">{pendingRewards}</span>}
                        </div>
                        <span>Game</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
