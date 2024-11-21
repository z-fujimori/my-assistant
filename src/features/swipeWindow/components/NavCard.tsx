// import React from 'react'

const NavCard = (props:{
  text: string,
  clickIvent: () => void
}) => {
  return (
    <div>
      <button 
        className="mr-1 p-3 bg-dark text-gray-400"
        onClick={props.clickIvent}
      >{props.text}</button>
    </div>
  )
}

export default NavCard