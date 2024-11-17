import React from 'react'
import { Titles } from "../TimememoCard"

const Title = (props:{
  titleId: string,
  setTitleId: React.Dispatch<React.SetStateAction<string>>,
  titles: Titles | null, 
  titleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, 
  openModal: () => void,
}) => {
  // const titleChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
  //     console.log("タイトルID ：　",e.target.value);
  //     props.setTitleId(e.target.value);
  // }
  return (
    <div className="flex">
      <select name="" id=""
        value={props.titleId}
        onChange={props.titleChange}
        className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 "
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
  )
}

export default Title