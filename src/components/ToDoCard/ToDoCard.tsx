import { Link } from "react-router-dom";
import { TodoList } from "../../types/types";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useEffect, useState } from "react";

export default function ToDoCard({ task }: { task: TodoList }) {
  const [list, setList] = useState<TodoList[]>([]);
  // Load from localStorage only once
  useEffect(() => {
    const storedList = localStorage.getItem("todoLists");
    if (storedList) {
      setList(JSON.parse(storedList));
    } else {
      setList([]);
    }
  }, []);

  // Save to localStorage when todoList is initialized
  useEffect(() => {
    if (list !== null) {
      localStorage.setItem("todoLists", JSON.stringify(list));
    }
  }, [list]);
  function handleRemoveList(listId: string) {
    setList((prevLists) => prevLists.filter((list) => list.id !== listId));
    localStorage.setItem("todoLists", JSON.stringify(list));
    window.location.reload();
  }
  return (
    <>
      <div className="p-4 shadow-md border border-gray-300 rounded-md">
        <Link to={`/todo/${task.id}`} className=" cursor-pointer">
          <h3 className="font-semibold text-xl mb-2">{task.title}</h3>

          <ProgressBar
            completed={task.todos.filter((todo) => todo.completed).length}
            total={task.todos.length}
          />
        </Link>
        <button
          onClick={() => {
            handleRemoveList(task.id);
          }}
          className="btn bg-red-500 hover:bg-red-400 mt-3 ml-auto"
        >
          Delete
        </button>
      </div>
    </>
  );
}
