export type InputTime = {
  // id: number,
  title_id: number,
  start_time: string,
  end_time: string
}
export type GetTime = {
  id: number,
  title_id: number,
  title: string,
  start_time: string,
  end_time: string
}
export type Times = {
  times: [GetTime]
}
type Title = {
  id: number;
  title: string;
}
export type Titles = {
  titles: [Title]
}
