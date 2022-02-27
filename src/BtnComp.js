import React, { useState } from 'react';
function BtnComp(props) {
    const [ defaultValue, setDefaultValue ] = useState();
    function sendValue(e) {
        console.log("Clicked", defaultValue);
        props.recieveDefaultValue(defaultValue);
    }
    function recieveValue(e) {
        console.log(e.target.value);
        // defaultValue = e.target.value;
        setDefaultValue( parseInt( e.target.value));
    }
    return (
        <div className='btnBox'>
            <input type="text" onChange={recieveValue} value={ defaultValue }></input>
            <button onClick={sendValue}>submit</button>
            <button >clickMe</button>
        </div>
    )
}
export default BtnComp;
