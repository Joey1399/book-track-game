import { createContext, useContext, useState, useEffect } from 'react';
import { UNLOCKABLE_ITEMS, DEFAULT_CHARACTER } from '../utils/gameData';

const GameContext = createContext();

export function useGame() {
    return useContext(GameContext);
}

export function GameProvider({ children }) {
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem('bookquest_game_stats');
        return saved ? JSON.parse(saved) : { xp: 0, level: 1, coins: 0 };
    });

    const [inventory, setInventory] = useState(() => {
        const saved = localStorage.getItem('bookquest_inventory');
        return saved ? JSON.parse(saved) : [];
    });

    // New Game Profile State
    const [gameProfile, setGameProfile] = useState(() => {
        const saved = localStorage.getItem('bookquest_game_profile');
        return saved ? JSON.parse(saved) : {
            hasCreatedCharacter: false,
            hasCreatedHouse: false,
            characterConfig: null,
            houseConfig: null
        };
    });

    const [unlockedItems, setUnlockedItems] = useState(() => {
        const saved = localStorage.getItem('bookquest_unlocked');
        return saved ? JSON.parse(saved) : [];
    });

    const [pendingRewards, setPendingRewards] = useState(() => {
        const saved = localStorage.getItem('bookquest_pending_rewards');
        return saved ? JSON.parse(saved) : 0;
    });

    useEffect(() => {
        localStorage.setItem('bookquest_game_stats', JSON.stringify(stats));
    }, [stats]);

    useEffect(() => {
        localStorage.setItem('bookquest_inventory', JSON.stringify(inventory));
    }, [inventory]);

    useEffect(() => {
        localStorage.setItem('bookquest_game_profile', JSON.stringify(gameProfile));
    }, [gameProfile]);

    useEffect(() => {
        localStorage.setItem('bookquest_unlocked', JSON.stringify(unlockedItems));
    }, [unlockedItems]);

    useEffect(() => {
        localStorage.setItem('bookquest_pending_rewards', JSON.stringify(pendingRewards));
    }, [pendingRewards]);

    const addXp = (amount) => {
        setStats(prev => {
            const newXp = prev.xp + amount;
            const nextLevelXp = prev.level * 100;
            let newLevel = prev.level;

            if (newXp >= nextLevelXp) {
                newLevel += 1;
            }

            return { ...prev, xp: newXp, level: newLevel };
        });
    };

    const saveCharacter = (config) => {
        setGameProfile(prev => ({
            ...prev,
            hasCreatedCharacter: true,
            characterConfig: config
        }));
    };

    const saveHouse = (config) => {
        setGameProfile(prev => ({
            ...prev,
            hasCreatedHouse: true,
            houseConfig: config
        }));
    };

    const addPendingReward = () => {
        setPendingRewards(prev => prev + 1);
    };

    const claimReward = () => {
        if (pendingRewards > 0) {
            // Find items that haven't been unlocked yet
            const availableItems = UNLOCKABLE_ITEMS.filter(
                item => !unlockedItems.includes(item.id)
            );

            let reward = null;
            if (availableItems.length > 0) {
                reward = availableItems[Math.floor(Math.random() * availableItems.length)];
                setUnlockedItems(prev => [...prev, reward.id]);
                setInventory(prev => [...prev, reward]);
            } else {
                // Fallback reward (coins) if all items unlocked
                setStats(prev => ({ ...prev, coins: prev.coins + 50 }));
                reward = { name: '50 Coins', icon: '💰' };
            }

            setPendingRewards(prev => prev - 1);
            return reward;
        }
        return null;
    };

    // Deprecated: unlockReward (kept for compatibility)
    const unlockReward = () => {
        addPendingReward();
        return { name: 'Mystery Reward' };
    };

    const resetGame = () => {
        setGameProfile({
            hasCreatedCharacter: false,
            hasCreatedHouse: false,
            characterConfig: null,
            houseConfig: null
        });
        setStats({ xp: 0, level: 1, coins: 0 });
        setInventory([]);
        setUnlockedItems([]);
        setPendingRewards(0);
    };

    const value = {
        stats,
        inventory,
        gameProfile,
        unlockedItems,
        pendingRewards,
        addXp,
        saveCharacter,
        saveHouse,
        addPendingReward,
        claimReward,
        unlockReward,
        resetGame
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}
