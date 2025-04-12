import { useEffect, useState } from "react";
import ToDoCard from "../../components/ToDoCard/ToDoCard";
import { TodoList } from "../../types/types";

export default function Home() {
  const [todoList, setTodoList] = useState<TodoList[] | null>(null);
  const [newListTitle, setNewListTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Load from localStorage only once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedList = localStorage.getItem("todoLists");
      if (storedList) {
        setTodoList(JSON.parse(storedList));
      } else {
        setTodoList([]);
      }
    }
  }, []);

  // Save to localStorage only when todoList is initialized
  useEffect(() => {
    if (todoList !== null) {
      localStorage.setItem("todoLists", JSON.stringify(todoList));
    }
  }, [todoList]);

  const addListTitle = () => {
    if (!newListTitle.trim()) {
      setError("Please enter a title for the list.");
      return;
    }

    const newList: TodoList = {
      id: Date.now().toString(),
      title: newListTitle,
      todos: [],
    };

    setTodoList((prev) => (prev ? [...prev, newList] : [newList]));
    setNewListTitle("");
    setError("");
  };

  return (
    <>
      <div className="mb-5 mx-3 md:mx-auto border-2 border-gray-300 rounded-lg p-5 mt-10 shadow-md">
        <h2 className="mb-2">Add Tasks:</h2>
        <div className="flex gap-4 mb-5">
          <input
            name="title"
            className="form-control"
            type="text"
            placeholder="New list title"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          {error && <p className="text-red-500">*{error}</p>}
          <button
            onClick={addListTitle}
            className="btn bg-blue-500 hover:bg-blue-400"
            type="button"
          >
            Add
          </button>
        </div>
      </div>

      {todoList && todoList.length > 0 ? (
        <div className="p-3 md:p-0 my-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {todoList.map((list) => (
            <ToDoCard key={list.id} task={list} />
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl font-semibold">
          No tasks available. Please add a task.
        </p>
      )}
    </>
  );
}

// export default function Home() {
//   const [todoList, setTodoList] = useState<TodoList[]>([]);
//   const [newListTitle, setNewListTitle] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const storedList = localStorage.getItem("todoLists");
//     if (storedList) {
//       setTodoList(JSON.parse(storedList));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("todoLists", JSON.stringify(todoList));
//   }, [todoList]);

//   function addListTitle() {
//     if (newListTitle === "") {
//       setError("Please enter a title for the list.");
//       return;
//     }
//     const newList: TodoList = {
//       id: Date.now().toString(),
//       title: newListTitle,
//       todos: [],
//     };
//     setTodoList([...todoList, newList]);

//     setNewListTitle("");
//     setError("");
//   }

//   return (
//     <>
//       <div className="mb-5 mx-3  md:mx-auto border-2 border-gray-300 rounded-lg p-5 mt-10 shadow-md">
//         <h2 className="mb-2">Add Tasks:</h2>
//         <div className="flex gap-4 mb-5">
//           <input
//             name="title"
//             className="form-control"
//             type="text"
//             placeholder="New list title"
//             value={newListTitle}
//             onChange={(e) => {
//               setNewListTitle(e.target.value);
//             }}
//           />
//           {error && <p className="text-red-500">*{error}</p>}
//           <button
//             onClick={addListTitle}
//             className="btn bg-blue-500 hover:bg-blue-400"
//             type="submit"
//           >
//             Add
//           </button>
//         </div>
//       </div>
//       {todoList?.length > 0 ? (
//         <div className="p-3 md:p-0 my-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
//           {todoList.map((list) => (
//             <ToDoCard key={list.id} task={list} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-2xl font-semibold">
//           No tasks available. Please add a task.
//         </p>
//       )}
//     </>
//   );
// }
