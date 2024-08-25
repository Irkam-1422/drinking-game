import React, { useState, useEffect, useRef } from "react";
import { demoPunishments, demoPunishments_wpl } from "../db/punishments";
import { useSelector } from "react-redux";
import bomb1 from "../assets/bomb1.png";
import bomb2 from "../assets/bomb2.png";
import bomb3 from "../assets/bomb3.png";
import bomb4 from "../assets/bomb4.png";
import bomb5 from "../assets/bomb5.png";
import bomb6 from "../assets/bomb6.png";
import bomb7 from "../assets/bomb7.png";
import bomb8 from "../assets/bomb8.png";
import bomb9 from "../assets/bomb9.png";
import explosion from "../sounds/explosion.mp3";
import { getRandom } from "../util/functions";

const imgs = [bomb1, bomb2, bomb3, bomb4, bomb5, bomb6, bomb7, bomb8, bomb9];

export const Bomb = ({ setRetry }) => {
  const audioRef = useRef(null);
  const [bomb_i, setBomb_i] = useState(0);
  const [punishments, setPunishments] = useState(demoPunishments);
  const players = useSelector((state) => state.currentPlayers);

  useEffect(() => {
    if (audioRef.current) audioRef.current.play();
    const intervalId = setInterval(() => {
      setBomb_i((prevBomb_i) => {
        if (prevBomb_i === imgs.length) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          clearInterval(intervalId);
          return -1;
        }
        return prevBomb_i + 1;
      });
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setPunishments(getPunishments(players));
  }, [players]);

  const getPunishments = (players) => {
    return players.length === 0
      ? demoPunishments
      : demoPunishments.concat(
          demoPunishments_wpl.map((q) =>
            q.replace("{{player}}", getRandom(players))
          )
        );
  };

  return (
    <>
      <audio ref={audioRef} preload="auto" src={explosion}></audio>
      <div
        className="quest-cont"
        style={{ justifyContent: "initial", background: "#160d1e" }}
      >
        <h1 className="quest" style={{ height: "fit-content" }}>
          You lost :(
        </h1>
        <div className="bomb-wrap">
          {imgs.map((bomb, i) => (
            <img
              key={i}
              src={bomb}
              style={{ opacity: bomb_i == i ? "1" : "0" }}
            />
          ))}
          <div
            className="punishment"
            style={{ opacity: bomb_i == -1 ? "1" : "0" }}
          >
            {getRandom(punishments)}
            <br />
            or drink {getRandom([1, 2, 3, 4, 5])}
          </div>
        </div>
        <button className="start-btn w-100 bg-orange" onClick={setRetry}>
          Start over
        </button>
      </div>
    </>
  );
};
