import React from 'react'
import { Titles } from '../features/timememo/components/TimememoCard'

const Test2 = (props:{
  setTitleId: React.Dispatch<React.SetStateAction<string>>,
  titles: Titles | null,
  openModal: ()=>void,
}) => {
  const titleChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
    props.setTitleId(e.target.value);
  }

  return (
    <div>
      <div className='text-3xl'>Test2</div>
      <div className="flex">
        <select name="" id=""
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 "
          onChange={titleChange}
        >
          {props.titles ? (
            props.titles.titles.map((title) => (
              <option key={title.id} value={title.id}>
                {title.title}
              </option>
            ))
          ) : (
            <option>データを読み込み中です...</option>
          )}
        </select>
        <button className="mx-3 px-3 py-1 border-gray-600 text-white rounded-md focus:outline-none hover:bg-gray-700"
          onClick={props.openModal}
        >
          +
        </button>
      </div>
    </div>

  )
}

export default Test2