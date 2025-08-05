import React, { useState } from 'react';

const HabitTracker = ({ habits, setHabits }) => {
  const [newHabit, setNewHabit] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleAddHabit = () => {
    if (newHabit.trim() !== '') {
      setHabits([...habits, { name: newHabit, records: {} }]);
      setNewHabit('');
    }
  };

  const handleDeleteHabit = (habitIndex) => {
    const newHabits = habits.filter((_, index) => index !== habitIndex);
    setHabits(newHabits);
  };

  const changeWeek = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset * 7);
    setCurrentDate(newDate);
  }

  const getWeekDays = (date) => {
    const week = [];
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));

    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(monday);
      weekDay.setDate(monday.getDate() + i);
      week.push(weekDay);
    }
    return week;
  };

  const weekDays = getWeekDays(new Date(currentDate));

  const handleStatusChange = (habitIndex, date) => {
    const dateKey = date.toISOString().split('T')[0];

    const newHabits = habits.map((habit, index) => {
      if (index !== habitIndex) {
        return habit;
      }

      const currentStatus = habit.records[dateKey] || 'none';
      let nextStatus;
      if (currentStatus === 'none') nextStatus = 'ok';
      else if (currentStatus === 'ok') nextStatus = 'x';
      else if (currentStatus === 'x') nextStatus = 'triangle';
      else nextStatus = 'none';

      return {
        ...habit,
        records: {
          ...habit.records,
          [dateKey]: nextStatus,
        },
      };
    });

    setHabits(newHabits);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  const getStatusSymbol = (status) => {
    if (status === 'ok') return '○';
    if (status === 'x') return '✖';
    if (status === 'triangle') return '△';
    return '';
  }

  return (
    <div>
      <div className="month-navigator">
        <button onClick={() => changeWeek(-1)} className="btn btn-secondary">‹ 前週</button>
        <h2>{`${weekDays[0].toLocaleDateString('ja-JP')} - ${weekDays[6].toLocaleDateString('ja-JP')}`}</h2>
        <button onClick={() => changeWeek(1)} className="btn btn-secondary">次週 ›</button>
      </div>
      <div className="add-habit-form d-flex mb-3">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="新しい習慣"
          className="form-control me-2"
        />
        <button onClick={handleAddHabit} className="btn btn-primary">追加</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>習慣</th>
            {weekDays.map((day, i) => <th key={i} className={isToday(day) ? 'today' : ''}>{day.toLocaleDateString('ja-JP', { weekday: 'short', day: 'numeric' })}</th>)}
            <th>達成数</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, habitIndex) => (
            <tr key={habitIndex}>
              <td className="habit-name">
                {habit.name}
                <button 
                  onClick={() => handleDeleteHabit(habitIndex)} 
                  className="btn btn-danger btn-sm ms-2 delete-habit"
                >
                  ✖
                </button>
              </td>
              {weekDays.map((day, dayIndex) => {
                const dateKey = day.toISOString().split('T')[0];
                const status = (habit.records || {})[dateKey] || 'none';
                return (
                  <td 
                    key={dayIndex} 
                    className={`record-cell status-${status}`}
                    onClick={() => handleStatusChange(habitIndex, day)}
                  >
                    {getStatusSymbol(status)}
                  </td>
                );
              })}
              <td>{Object.values(habit.records || {}).filter(r => r === 'ok').length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitTracker;