import React from "react";

export default function Answer(props) {
    return (
        <li className="answer" id={props.id} iscorrect={props.iscorrect}>
            {props.id}.  {props.children}
        </li>
    );
}