import React from "react";

export default function Timer(props) {
    return (
        <div id="timer" className={props.className}>{props.children}</div>
    )
};