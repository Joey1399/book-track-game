import { useState } from 'react';
import { useGame } from '../context/GameContext';
import './Game.css';

export default function Game() {
    const { stats } = useGame();
    const [activeTab, setActiveTab] = useState('character');

    return (
        <div className="game-page">
            <header className="game-header">
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-label">Level</span>
                        <span className="stat-value">{stats.level}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">XP</span>
                        <span className="stat-value">{stats.xp}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Coins</span>
                        <span className="stat-value">{stats.coins}</span>
                    </div>
                </div>
            </header>

            <div className="game-tabs">
                <button
                    className={`tab-btn ${activeTab === 'character' ? 'active' : ''}`}
                    onClick={() => setActiveTab('character')}
                >
                    Character
                </button>
                <button
                    className={`tab-btn ${activeTab === 'house' ? 'active' : ''}`}
                    onClick={() => setActiveTab('house')}
                >
                    House
                </button>
                <button
                    className={`tab-btn ${activeTab === 'shop' ? 'active' : ''}`}
                    onClick={() => setActiveTab('shop')}
                >
                    Shop
                </button>
            </div>

            <div className="game-content">
                {activeTab === 'character' && (
                    <div className="preview-container">
                        <img
                            src="/assets/character_preview.png"
                            alt="Character Creator Preview"
                            className="preview-image"
                        />
                        <p className="preview-caption">Character creation coming soon!</p>
                    </div>
                )}
                {activeTab === 'house' && (
                    <div className="placeholder-container">
                        <h2>House</h2>
                        <p>House customization coming soon.</p>
                    </div>
                )}
                {activeTab === 'shop' && (
                    <div className="placeholder-container">
                        <h2>Shop</h2>
                        <p>Item shop coming soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
