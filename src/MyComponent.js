import React, { Component } from 'react';
function MyComp(props) {
    console.log(props)
    return (
        <>
            <div id={props.id} style={props.style}>
                <div style={{ backgroundColor: 'gray' }}>{props.name}</div>
                <div style={{ marginTop: 50 }}>{props.children}</div>
                {props.children && <div style={{ marginTop: 50 }}>Children</div>}

            </div>
            <div>Count: {props.count ? props.count : "-"}</div>
        </>
    )
}
export default MyComp;
// if (props.children) {
//     textValue = <div style={{ marginTop: 50 }}>Children</div>;
// }