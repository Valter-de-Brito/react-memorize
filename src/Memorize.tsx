import React from "react";
import "./Memorize.css";

function Memorize() {
  return (
    <main>
      <h1 className="title-base title">Memorize</h1>

      <div className="board">
        <div className="cell">❤</div>
        <div className="cell">❤</div>
        <div className="cell">❤</div>
        <div className="cell">❤</div>
        <div className="cell">❤</div>
        <div className="cell">❤</div>
        <div className="cell">❤</div>
        <div className="cell">❤</div>
      </div>

      <h1 className="title-base footer">Score: 0</h1>
    </main>
  );
}

export default Memorize;
