import React from 'react'



const Keyboard = ( props: { value:number, updateNumber: void } ) => {

    return (
        <div className="m-10" onClick={() => updateState()} >
            { props.value }
        </div>
    )
}

export default Keyboard