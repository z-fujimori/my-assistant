// import React from 'react'
import { useEffect, useState } from 'react'
import { GetTaskWithTimes, Tasks } from '../../../types/timeMemo'
import InputUrl from './InputUrl'
import WeeklyGrass from './WeeklyGrass '
import { invoke } from '@tauri-apps/api/core'

const Task = (props:{
  tasks: Tasks | null,
  setStateUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  weeklyTime: GetTaskWithTimes | null
}) => {

  console.log("tasks",props.weeklyTime);

  return (
    <div>
      <div>
        {props.tasks ? (
          props.tasks.tasks.map((task) => (
            <div key={"task"+task.id} className='m-3'>
              <p>{task.name}</p>
              <div className='ml-5'>
                {task.projects.map((pro) => (
                  <InputUrl key={"p" + pro.id} id={pro.id} val={pro.rep_url} taskId={task.id} setStateUpdate={props.setStateUpdate} />
                ))}
                <InputUrl key={"t"+task.id} id={null} val="" taskId={task.id} setStateUpdate={props.setStateUpdate} />
              </div>
              <WeeklyGrass weeklyTime={props.weeklyTime?.tasks[task.id]} id={task.id} />
            </div>
          ))
        ) : (
          <p>task記録なし</p>
        )}
      </div>
    </div>
  )
}

export default Task