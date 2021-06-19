import React from "react";

export default function Score(props) {
    return (
        <li className="score">
            {props.children}
        </li>
    );
}