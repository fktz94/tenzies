import React, { useEffect, useState } from "react";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const allHeld = dice.every((element) => element.isHeld);
    let allEqual;
    allHeld &&
      (allEqual = dice.every((element) => element.value === dice[0].value));
    allEqual && setTenzies(true);
  }, [dice]);

  function generateDice() {
    const number = Math.ceil(Math.random() * 6);
    return { value: number, isHeld: false, id: nanoid() };
  }

  function allNewDice() {
    const diceNumbers = [];
    for (let i = 0; i < 10; i++) {
      diceNumbers.push(generateDice());
    }
    return diceNumbers;
  }

  function rollDice() {
    if (!tenzies) {
      setCount((prevCount) => prevCount + 1);
      setDice((oldDice) =>
        oldDice.map((dice) => (dice.isHeld ? dice : generateDice()))
      );
    } else {
      setCount(0);
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  const diceElements = dice.map((dice) => {
    const { id, value, isHeld } = dice;
    return (
      <Dice
        key={id}
        value={value}
        isHeld={isHeld}
        holdDice={() => holdDice(id)}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti />}
      <header className="counter">
        {tenzies ? `Total counts: ${count}` : `Count: ${count}`}
      </header>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New game" : "Roll"}
      </button>
    </main>
  );
}
