import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { demoQuestions, demoQuestions_wpl } from "../db/questions";
import { Bomb } from "./Bomb";
import { getRandom } from "../util/functions";
import ticking from "../sounds/ticking.mp3";

const colors = ["orange", "green", "pink", "blue"];

export const Home = () => {
  const coverRef = useRef(null);
  const audioRef = useRef(null);
  const players = useSelector((state) => state.currentPlayers);
  const [questions, setQuestions] = useState(demoQuestions);
  const generateQuestion = () => getRandom(questions);
  const [question, setQuestion] = useState(generateQuestion());
  const [gameOver, setGameOver] = useState(false);
  const [color_i, setColor_i] = useState(0);
  const [random, setRandom] = useState(20000 + Math.random() * 10000);
  const [timeLeft, setTimeLeft] = useState(random);
  const [intervalSpeed, setIntervalSpeed] = useState(2400);

  useEffect(() => {
    if (audioRef.current) {
      if (gameOver) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.play();
        audioRef.current.loop = true;
      }
    }
  }, [gameOver, audioRef]);

  useEffect(() => {
    setQuestions(getQuestions(players));
  }, [players]);

  useEffect(() => {
    setTimeLeft(random);
  }, [random]);

  useEffect(() => {
    if (!gameOver) {
      if (timeLeft / random <= 0.3) {
        setIntervalSpeed(900);
        if (audioRef.current) audioRef.current.playbackRate = 2;
      } else if (timeLeft / random <= 0.6) {
        setIntervalSpeed(1200);
        if (audioRef.current) audioRef.current.playbackRate = 1.5;
      } else {
        setIntervalSpeed(2400);
        audioRef.current.playbackRate = 1;
      }

      const colorTimeout = setTimeout(() => {
        handleCoverPulsation();
        setTimeLeft((prevTimeLeft) => prevTimeLeft - intervalSpeed);
      }, intervalSpeed);

      const bombTimeout = setTimeout(() => {
        setGameOver(true);
        clearTimeout(colorTimeout);
      }, timeLeft);

      return () => {
        clearTimeout(colorTimeout);
        clearTimeout(bombTimeout);
      };
    }
  }, [gameOver, timeLeft, intervalSpeed]);

  const getQuestions = (players) => {
    return players.length === 0
      ? demoQuestions
      : demoQuestions.concat(
          demoQuestions_wpl.map((q) =>
            q.replace("{{player}}", getRandom(players))
          )
        );
  };

  const handleCoverPulsation = () => {
    if (coverRef.current) {
      coverRef.current.style.opacity = ".2";
      setTimeout(() => {
        if (coverRef.current) coverRef.current.style.opacity = "0";
      }, 300);
    }
  };

  return (
    <div className={`bg-${colors[color_i]}`}>
      {gameOver ? (
        <Bomb
          setRetry={() => {
            setGameOver(false);
            setQuestion(generateQuestion());
            setRandom(20000 + Math.random() * 10000);
          }}
        />
      ) : (
        <>
          <audio
            ref={audioRef}
            src={ticking}
            preload="auto"
          ></audio>
          <div
            ref={coverRef}
            className="cover"
            onClick={() => {
              color_i === 3 ? setColor_i(0) : setColor_i(color_i + 1);
              setQuestion(generateQuestion());
            }}
          ></div>
          <div className="quest-cont">
            <div className="quest">{question}</div>
          </div>
        </>
      )}
    </div>
  );
};
