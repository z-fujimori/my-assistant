import React from 'react'
import { Tasks } from '../../../../types/timeMemo'

const Task = (props:{
  taskId: string,
  setTaskId: React.Dispatch<React.SetStateAction<string>>,
  tasks: Tasks | null, 
  taskChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, 
  openModal: () => void,
}) => {
  return (
    <div className="flex">
      <select name="" id=""
        value={props.taskId}
        onChange={props.taskChange}
        className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 "
      >
        {props.tasks ? (
          props.tasks.tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
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

export default Task