import React, { useState, useEffect } from 'react';
import './styles.css';

const buttonColours = ["red", "blue", "green", "yellow"];

const SimonGame = () => {
  const [gamePattern, setGamePattern] = useState([]);
  const [userClickedPattern, setUserClickedPattern] = useState([]);
  const [level, setLevel] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (started) {
      nextSequence();
    }
  }, [started]);

  useEffect(() => {
    if (userClickedPattern.length && userClickedPattern.length === gamePattern.length) {
      if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
        setTimeout(() => {
          nextSequence();
          setUserClickedPattern([]);
        }, 1000);
      } else {
        gameOverHandler();
      }
    }
  }, [userClickedPattern]);

  const playSound = (name) => {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  };

  const nextSequence = () => {
    setLevel(prevLevel => prevLevel + 1);
    document.getElementById("level-title").innerText = "Level " + (level + 1);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColours[randomNumber];
    setGamePattern(prevPattern => [...prevPattern, randomChosenColor]);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
  };

  const handleButtonClick = (color) => {
    setUserClickedPattern(prevPattern => [...prevPattern, color]);
    playSound(color);
    animatePress(color);
  };

  const animatePress = (currentColor) => {
    const button = document.getElementById(currentColor);
    button.classList.add("pressed");
    setTimeout(() => {
      button.classList.remove("pressed");
    }, 100);
  };

  const gameOverHandler = () => {
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);
    document.getElementById("level-title").innerText = "Game Over, Press Any Key to Restart";
    setStarted(false);
    setLevel(0);
    setGamePattern([]);
    setUserClickedPattern([]);
    setGameOver(true);
  };

  const handleKeyPress = () => {
    if (!started) {
      setStarted(true);
      setGameOver(false);
      document.getElementById("level-title").innerText = "Level " + (level + 1);
    }
  };

  return (
    <div onKeyPress={handleKeyPress} tabIndex="0">
      <h1 id="level-title">Press A Key to Start</h1>
      <div className="container">
        <div className="row">
          <div id="green" className="btn green" onClick={() => handleButtonClick("green")}></div>
          <div id="red" className="btn red" onClick={() => handleButtonClick("red")}></div>
        </div>
        <div className="row">
          <div id="yellow" className="btn yellow" onClick={() => handleButtonClick("yellow")}></div>
          <div id="blue" className="btn blue" onClick={() => handleButtonClick("blue")}></div>
        </div>
      </div>
    </div>
  );
};

export default SimonGame;