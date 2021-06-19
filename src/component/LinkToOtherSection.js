import React from "react";

export default function LinkToOtherSection(props) {
    let handler = props.handler;  // click handler
    return (
        <div id="gotoSection" className={"linkToOtherSection col-sm-2"} onClick={handler}>{props.children}</div>
    )
}