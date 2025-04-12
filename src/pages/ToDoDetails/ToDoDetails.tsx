import { useParams } from "react-router-dom";
import { TodoItem, TodoList } from "../../types/types";
import { useEffect, useState } from "react";

export default function ToDoDetails() {
  const [todoText, setTodoText] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoList[]>(
    JSON.parse(localStorage.getItem("todoLists")!)
  );
  const [error, setError] = useState<string>("");
  const { id } = useParams();

  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(todoList));
  }, [todoList]);

  const taskDetails = todoList.find((list) => list.id === id);

  const handleAdd = () => {
    if (todoText === "") {
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

  function toggleCompleted(todo: TodoItem) {
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
  }

  const deleteTodo = (todoId: string) => {
    if (!taskDetails) return;

    setTodoList((prev) =>
      prev.map((list) =>
        list.id === taskDetails.id
          ? {
              ...list,
              todos: list.todos.filter((todo) => todo.id !== todoId),
            }
          : list
      )
    );
  };

  return (
    <>
      <h1 className="text-3xl font-bold">ToDo Details</h1>
      <div className="mt-4">
        <p className="text-xl">
          Details for ToDo with title: {taskDetails!.title}
        </p>
        <div className="mt-2.5">
          <input
            type="text"
            placeholder="Add a new task"
            className="form-control"
            value={todoText}
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
          />
          {error && <p className="text-red-500">*{error}</p>}
          <button
            onClick={handleAdd}
            className="btn bg-blue-500 hover:bg-blue-400 mt-2"
          >
            {" "}
            Add
          </button>
        </div>
        {taskDetails!.todos.length > 0 ? (
          <>
            {taskDetails!.todos.map((todo: TodoItem) => {
              return (
                <div
                  key={todo.id}
                  className="mt-2.5 flex items-center justify-between  border-b border-gray-300 pb-2 "
                >
                  <p className="text-2xl font-semibold">{todo.text}</p>
                  <div className="flex items-center gap-3">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      checked={!!todo.completed}
                      onChange={() => toggleCompleted(todo)}
                    />
                    <button
                      className="btn bg-red-500 hover:bg-red-400"
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <p className="text-xl font-semibold mt-2.5">
            No tasks available for this list.
          </p>
        )}
      </div>
    </>
  );
}
