import React from "react";

export default function Answer(props) {
    return (
        <li className="answer" iscorrect={props.iscorrect}>
            {props.children}
        </li>
    );
}