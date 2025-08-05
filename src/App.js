import React, { useState, useEffect } from 'react';
import HabitTracker from './HabitTracker';
import Reflection from './Reflection';
import './App.css';

function App() {
  // Load habits from localStorage or use an empty array
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  return (
    <div className="App">
      <header>
        <h1>習慣チェッカー</h1>
      </header>
      <main>
        <div className="habit-tracker-container">
          <HabitTracker habits={habits} setHabits={setHabits} />
        </div>
        <div className="reflection-container">
          <Reflection />
        </div>
      </main>
    </div>
  );
}

export default App;