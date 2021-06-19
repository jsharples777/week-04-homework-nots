import React from "react";

export default function LinkToOtherSection(props) {
    let handler = props.handler;  // click handler
    return (
        <div id="gotoSection" className={props.className} onClick={handler}>{props.children}</div>
    )
}