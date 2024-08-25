import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCurrentPlayers } from "../actionCreators";

export const Start = () => {
  const [players, setPlayers] = useState(["Bob", "Daan", "Ababanana"]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="start-cont">
      <div className="input-cont players-input-cont">
        <input
          className="players-input"
          type="text"
          placeholder="Who is playing with?"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value) {
              setPlayers([...players, e.target.value]);
              inputRef.current.value = "";
            }
          }}
        />
        <button
          className="add-player"
          onClick={() => {
            if (inputRef.current && inputRef.current.value) {
              setPlayers([...players, inputRef.current.value]);
              inputRef.current.value = "";
            }
          }}
        >
          +
        </button>
      </div>
      <div className="players">
        {players.map((player, i) => (
          <div className="player">
            {player}
            <button
              className="delete-btn"
              onClick={() =>
                setPlayers(players.slice(0, i).concat(players.slice(i + 1)))
              }
            >
              x
            </button>
          </div>
        ))}
      </div>
      <button
        className="start-btn"
        onClick={() => {
          dispatch(setCurrentPlayers(players));
          navigate("/play");
        }}
      >
        Start the game
      </button>
    </div>
  );
};
