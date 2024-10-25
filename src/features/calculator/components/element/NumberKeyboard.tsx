// import React from 'react'



const NumberKeyboard = (
    props: { value:number, updateNumber: (x: number) => void }
) => {

    return (
        <>
            <button 
                className="m-10 bg-cyan-500" 
                onClick={() => props.updateNumber(props.value)}>

                { props.value }

            </button>
        </>
    )
}

export default NumberKeyboard
