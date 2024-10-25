// import React from 'react'

const SymbolKeyboard = (
    props: { value:string, function: () => void }
) => {

    return (
        <>
            <button 
                className="m-10 bg-cyan-500" 
                onClick={() => props.function()}>

                { props.value }

            </button>
        </>
    )
}

export default SymbolKeyboard