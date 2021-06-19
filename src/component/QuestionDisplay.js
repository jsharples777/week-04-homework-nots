import React from "react";
import AnswerList from "./AnswerList";

export default function QuestionDisplay(props) {

    let question = props.question;
    if (question === undefined) {
        question = {};
    }
    let hasQuizStarted = props.hasQuizStarted;
    let startQuizHandler = props.startQuizHandler;
    let answerSelectionHandler = props.answerSelectionHandler;

    return hasQuizStarted ? (
        <div id="questionDisplayView">
            <h4 id="question">{props.children}</h4>
            <AnswerList answers={question.answers} handler={answerSelectionHandler}/>
        </div>
    ) : (
        <div id="questionDisplayView">
            <h4 id="question">{props.children}</h4>
            <button id="startQuizButton" onClick={startQuizHandler}>Start Quiz</button>
        </div>
    );

}