// import React from 'react'



const NumberKeyboard = (
    props: { value:number, updateNumber: (x: number) => void }
) => {

    return (
        <>
            <button 
                className="mx-1 w-12 h-10 bg-mintGreen hover:bg-emerald-600"
                onClick={() => props.updateNumber(props.value)}>

                { props.value }

            </button>
        </>
    )
}

export default NumberKeyboard
