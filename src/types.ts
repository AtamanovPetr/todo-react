export interface Todo {
  text: string;
  id: number;
  completed: boolean;
}
export type Filter = "all" | "active" | "completed";
