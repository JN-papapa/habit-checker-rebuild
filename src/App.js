import React, { useState, useEffect } from 'react';
import HabitTracker from './HabitTracker';
import Reflection from './Reflection';
import './App.css';

function App() {
  // --- State Management ---
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  const [monthlyGoal, setMonthlyGoal] = useState('');
  const [isGoalCompleted, setIsGoalCompleted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // --- Effects ---

  // Load and display the goal for the currently selected month
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const goalKey = `${year}-${month}`;

    const allGoals = JSON.parse(localStorage.getItem('monthlyGoalsHistory')) || {};
    const activeGoal = allGoals[goalKey] || { text: '', completed: false };

    setMonthlyGoal(activeGoal.text);
    setIsGoalCompleted(activeGoal.completed);

  }, [currentDate]);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);


  // --- Handlers ---

  const saveMonthlyGoal = (goalData) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const goalKey = `${year}-${month}`;

    const allGoals = JSON.parse(localStorage.getItem('monthlyGoalsHistory')) || {};
    allGoals[goalKey] = { ...allGoals[goalKey], ...goalData };

    localStorage.setItem('monthlyGoalsHistory', JSON.stringify(allGoals));
  };

  const handleGoalChange = (e) => {
    const newGoalText = e.target.value;
    setMonthlyGoal(newGoalText);
    saveMonthlyGoal({ text: newGoalText });
  };

  const handleGoalCompletionChange = (e) => {
    const newCompletedStatus = e.target.checked;
    setIsGoalCompleted(newCompletedStatus);
    saveMonthlyGoal({ completed: newCompletedStatus });
  };

  return (
    <div className="App">
      <header>
        <h1>習慣チェッカー</h1>
      </header>
      <main>
        <div className="monthly-goal-container">
          <div className="monthly-goal-header">
            <h2>{`${currentDate.getFullYear()}年 ${currentDate.getMonth() + 1}月 の目標`}</h2>
            <label className="goal-completed-label">
              <input
                type="checkbox"
                checked={isGoalCompleted}
                onChange={handleGoalCompletionChange}
              />
              達成
            </label>
          </div>
          <textarea
            value={monthlyGoal}
            onChange={handleGoalChange}
            placeholder="ここに今月の目標を入力..."
            rows="3"
            className={isGoalCompleted ? 'goal-completed' : ''}
          />
        </div>
        <div className="habit-tracker-container">
          <HabitTracker 
            habits={habits} 
            setHabits={setHabits} 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </div>
        <div className="reflection-container">
          <Reflection />
        </div>
      </main>
    </div>
  );
}

export default App;