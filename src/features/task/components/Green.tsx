import React from 'react'

const Green = () => {
  let color_num = 600;
  let opacity_num = 25;
  let css_class = `mr-1 p-4 bg-gray-${color_num} rounded-lg opacity-${opacity_num}`;

  return (
    <div>
      <div className="mr-1 p-4 bg-sky-500 rounded-lg opacity-50" ></div>
      <div className={css_class} ></div>
    </div>
  )
}

export default Green