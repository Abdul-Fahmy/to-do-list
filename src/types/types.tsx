export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoList {
  id: string;
  title: string;
  todos: TodoItem[];
}
export interface User {
  id: string;
  username: string;
  todoList: TodoItem[];
}
