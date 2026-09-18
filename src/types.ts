export interface Todo {
  text: string;
  id: number;
  completed: boolean;
}
export type Filter = "all" | "active" | "completed";

export type Action =
  | { type: "add"; payload: string }
  | { type: "delete"; payload: number }
  | { type: "toggle"; payload: number }
  | { type: "clear" };
