import { useParams } from "react-router-dom";
import { TodoItem, TodoList } from "../../types/types";
import { useEffect, useState } from "react";

export default function ToDoDetails() {
  const [todoText, setTodoText] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { id } = useParams();

  // Load from localStorage only once
  useEffect(() => {
    const storedList = localStorage.getItem("todoLists");
    if (storedList) {
      setTodoList(JSON.parse(storedList));
    }
    setHasLoaded(true); // Only allow saving after this
  }, []);

  // Save to localStorage only after it's been loaded
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("todoLists", JSON.stringify(todoList));
    }
  }, [todoList, hasLoaded]);

  const taskDetails = todoList.find((list) => list.id === id);

  const handleAdd = () => {
    if (!todoText.trim()) {
      setError("Please enter a task.");
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: todoText,
      completed: false,
    };

    const updatedList = todoList.map((list) =>
      list.id === id ? { ...list, todos: [...list.todos, newTodo] } : list
    );

    setTodoList(updatedList);
    setTodoText("");
    setError("");
  };

  const toggleCompleted = (todo: TodoItem) => {
    const updatedList = todoList.map((list) => {
      if (list.id === id) {
        const updatedTodos = list.todos.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t
        );
        return { ...list, todos: updatedTodos };
      }
      return list;
    });
    setTodoList(updatedList);
  };

  const deleteTodo = (todoId: string) => {
    if (!taskDetails) return;

    const updatedList = todoList.map((list) =>
      list.id === taskDetails.id
        ? {
            ...list,
            todos: list.todos.filter((todo) => todo.id !== todoId),
          }
        : list
    );
    setTodoList(updatedList);
  };
  const handleEdit = (todo: TodoItem) => {
    setEditingTodo(todo);
    setTodoText(todo.text); 
  };

  const saveEdit = () => {
    if (editingTodo && todoText.trim()) {
      const updatedList = todoList.map((list) =>
        list.id === id
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === editingTodo.id ? { ...todo, text: todoText } : todo
              ),
            }
          : list
      );

      setTodoList(updatedList);
      setEditingTodo(null); // Reset editing state
      setTodoText(""); // Clear the input
      setError(""); 
    } else {
      setError("Please enter a valid task.");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mx-3">ToDo Details</h1>

      <div className="mt-4 mx-3">
        <p className="text-xl">
          Details for ToDo with title:{" "}
          <span className="font-semibold text-2xl ">{taskDetails?.title}</span>
        </p>

        <div className="mt-2.5">
          <input
            type="text"
            placeholder="Add a new task"
            className="form-control"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          {error && <p className="text-red-500">*{error}</p>}
          {editingTodo ? (
            <button
              onClick={saveEdit}
              className="btn bg-green-600 hover:bg-green-500 mt-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="btn bg-blue-500 hover:bg-blue-400 mt-2"
            >
              Add
            </button>
          )}
        </div>

        <div className="mt-4">
          {taskDetails?.todos && taskDetails.todos.length > 0 ? (
            taskDetails.todos.map((todo: TodoItem) => (
              <div
                key={todo.id}
                className="mt-2.5 flex items-center justify-between border-b border-gray-300 pb-2"
              >
                <p
                  className={`text-2xl font-semibold decoration-slate-400 ${
                    todo.completed ? "line-through" : ""
                  } `}
                >
                  {todo.text}
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="cursor-pointer accent-green-600"
                    checked={todo.completed}
                    onChange={() => toggleCompleted(todo)}
                  />
                  <button
                    className="btn bg-yellow-500 hover:bg-yellow-400"
                    onClick={() => handleEdit(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn bg-red-500 hover:bg-red-400"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl font-semibold mt-2.5">
              No tasks available for this list.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
