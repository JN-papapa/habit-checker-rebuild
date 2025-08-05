
import React, { useState } from 'react';
import HabitTracker from './HabitTracker';
import Reflection from './Reflection';
import './App.css';

function App() {
  const [habits, setHabits] = useState([]);

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
