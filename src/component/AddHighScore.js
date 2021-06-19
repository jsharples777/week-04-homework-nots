import React from "react";

export default function AddHighScore(props) {
    let score = props.score;
    let handler = props.handler;
    return (
        <div id="addHighScore">
            <span id="scoreDisplay">{props.children}</span>
            <form id="addScoreForm" onSubmit={handler}>
                <input type="hidden" id="score" value={score}/>
                <label htmlFor="nameText">Name: </label>
                <input id="nameText" type="text"/>
                <button id="addScore">Add Score</button>
            </form>
        </div>
    );
}