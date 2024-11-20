export type InputTime = {
  // id: number,
  task_id: number,
  start_time: string,
  end_time: string
}
export type GetTime = {
  id: number,
  task_id: number,
  name: string,
  start_time: string,
  end_time: string
}
export type Times = {
  times: [GetTime]
}
type Task = {
  id: number;
  name: string;
}
export type Tasks = {
  tasks: [Task]
}
