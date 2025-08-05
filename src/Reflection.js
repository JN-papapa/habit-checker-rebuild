import React from 'react';

const Reflection = () => {
  return (
    <div>
      <h2>振り返り</h2>
      <div className="reflection-item">
        <label>気づいたことは？</label>
        <textarea className="form-control" />
      </div>
      <div className="reflection-item">
        <label>できたことは？</label>
        <textarea className="form-control" />
      </div>
      <div className="reflection-item">
        <label>次に何をやる？</label>
        <textarea className="form-control" />
      </div>
      <div className="reflection-item">
        <label>今週の達成度は？</label>
        <textarea className="form-control" />
      </div>
    </div>
  );
};

export default Reflection;