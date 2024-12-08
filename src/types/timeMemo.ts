export type InputTime = {
  // id: number,
  task_id: number,
  start_time: string,
  end_time: string
}
export type GetTime = {
  id: number,
  task_id: number,
  task: string,
  start_time: string,
  end_time: string
}
export type Times = {
  times: [GetTime]
}
type Project  = {
  id: number,
  rep_url: string
}
type Task = {
  id: number;
  name: string;
  projects: [Project]
}
export type Tasks = {
  tasks: [Task]
}
export type DaylyTime = {
  start_date: string,
  time: number,
  additions: number,
  deletions: number
}
export type GetTaskWithTime = {
  id: number,
  name: string,
  times: [DaylyTime]
}
export type GetTaskWithTimes = {
  tasks: [GetTaskWithTime]
}
