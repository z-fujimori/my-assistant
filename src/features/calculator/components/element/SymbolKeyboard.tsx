// import React from 'react'

const SymbolKeyboard = (
    props: { value:string, function: (sym:string) => void, equal:()=>void}
) => {

    return (
        <>
            <button 
                className="m-1 w-12 h-10 bg-mintGreen hover:bg-emerald-600"
                onClick={() => props.function(props.value)}>

                { props.value }

            </button>
        </>
    )
}

export default SymbolKeyboard