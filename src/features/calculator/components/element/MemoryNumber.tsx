// import React from 'react'

const MemoryNumber = (props:{mem:number, func:()=>void}) => {
    return (
        <button
            className="my-1 px-4"
            onClick={props.func}
        >
            <p>{props.mem}</p>
        </button>
    )
}

export default MemoryNumber