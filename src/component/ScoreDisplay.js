import React from "react";
import Score from "./Score.js";

export default function ScoreDisplay(props) {
    let scores = props.scores;
    let resetHandler = props.handler;
    return (
        <div id="scoreDisplayDiv">
            <h3>High Scores</h3>
            <ul id="scoreList">
                {scores.map((score,index) => <Score key={index}>{score.score + ".  " + score.name}</Score>)}
            </ul>
            <button id="resetScores" onClick={resetHandler}>Reset High Scores</button>
        </div>
    )
}
