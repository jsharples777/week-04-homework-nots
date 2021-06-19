import React from "react";

export default function AnswerFeedback(props) {
    return (
        <div id="answerFeedBack">
            <hr/>
            <span>{props.children}</span>
        </div>
    );
}