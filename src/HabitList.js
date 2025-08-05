import React from 'react';
import HabitItem from './HabitItem';

const HabitList = ({ habits, setHabits }) => {
  return (
    <div className="habit-list">
      {habits.map((habit, index) => (
        <HabitItem key={index} habit={habit} habits={habits} setHabits={setHabits} index={index} />
      ))}
    </div>
  );
};

export default HabitList;