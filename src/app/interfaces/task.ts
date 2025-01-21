export interface Task {
  id: number,
  text: string,
  due: string,
  duration: number,
  rate: number,
  created_at: Date,
  tags: string[],
  status: boolean
}
