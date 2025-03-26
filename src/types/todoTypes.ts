export interface Todo {
  id: string;
  date: string;
  title: string;
  desc: string;
  priority: string;
  isComplete: boolean;
}

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: null | string;
  addTask: boolean;
  taskToEdit: null | Todo;
}
