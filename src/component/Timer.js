import React from "react";

export default function Timer(props) {
    return (
        <div id="timer" className={"timer col-sm-2"}>{props.children}</div>
    )
};