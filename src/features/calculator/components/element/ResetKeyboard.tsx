// import React from 'react'

const ResetKeyboard = (
    props: { value:string, function: () => void }
) => {

    return (
        <>
            <button 
                className="m-2 w-12 h-10 bg-mintGreen hover:bg-emerald-600"
                onClick={() => props.function()}>

                { props.value }

            </button>
        </>
    )
}

export default ResetKeyboard