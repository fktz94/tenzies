import React from "react";

export default function Dice({ value, isHeld, holdDice }) {
  const styles = {
    backgroundColor: isHeld ? "#59e391" : "#ffffff",
  };

  return (
    <button className="dice" style={styles} onClick={holdDice}>
      {value}
    </button>
  );
}
