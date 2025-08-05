import React from 'react';

const HabitItem = ({ habit, habits, setHabits, index }) => {

  const handleClick = (dayIndex) => {
    const newHabits = [...habits];
    const currentStatus = newHabits[index].statuses[dayIndex] || 'none';
    let nextStatus;

    if (currentStatus === 'none') {
      nextStatus = 'circle';
    } else if (currentStatus === 'circle') {
      nextStatus = 'cross';
    } else if (currentStatus === 'cross') {
      nextStatus = 'triangle';
    } else {
      nextStatus = 'none';
    }
    newHabits[index].statuses[dayIndex] = nextStatus;
    setHabits(newHabits);
  };

  const countCircles = () => {
    return habit.statuses.filter(status => status === 'circle').length;
  }

  return (
    <div className="habit-item">
      <span>{habit.name}</span>
      <div className="status-container">
        {[...Array(7)].map((_, i) => (
            <button key={i} onClick={() => handleClick(i)} className={`status-button ${habit.statuses[i] || 'none'}`}>
                {habit.statuses[i] === 'circle' && '○'}
                {habit.statuses[i] === 'cross' && '✖'}
                {habit.statuses[i] === 'triangle' && '△'}
            </button>
        ))}
      </div>
      <span className="count">{countCircles()}</span>
    </div>
  );
};

export default HabitItem;