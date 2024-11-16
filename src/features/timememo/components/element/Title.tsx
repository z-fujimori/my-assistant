import React from 'react'
import { Titles } from "../TimememoCard"

const Title = (props:{
    titleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    titles: Titles | null, 
    openModal: () => void,
}) => {
    return (
        <div className="flex">
            <select name="" id=""
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 "
                onChange={props.titleChange}
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