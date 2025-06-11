import { useState, useRef } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [storageEnabled, setStorageEnabled] = useState(() => {
    return localStorage.getItem("storageDisabled") !== "true";
  });

  const [sortByRecent, setSortByRecent] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const getFilteredAndSortedTodos = () => {
    let filteredTodos = todos;

    if (filter === "COMPLETED") {
      filteredTodos = todos.filter(todo => todo.completed);
    } else if (filter === "INCOMPLETE") {
      filteredTodos = todos.filter(todo => !todo.completed);
    }

    if (sortByRecent) {
      return [...filteredTodos].sort((a, b) => b.createdAt - a.createdAt);
    } else {
      return [...filteredTodos].sort((a, b) => a.createdAt - b.createdAt);
    }
  };

  const updateTodos = (newTodos) => {
    setTodos(newTodos);
    if (storageEnabled) {
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  };

  function addTodos(text) {
    text = text.trim();
    if (text.length === 0) {
      alert("A ToDo cannot be empty.");
      return;
    }
    if (text.length > 100) {
      alert("A ToDo description cannot be greater than 100 characters.");
      return;
    }
    const task = {
      id: crypto.randomUUID(),
      completed: false,
      text,
      createdAt: Date.now()
    };
    updateTodos([...todos, task]);
  }

  function toggleCompleted(id) {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    updateTodos(newTodos);
  }

  function deleteTodo(id) {
    const newTodos = todos.filter(todo => todo.id !== id);
    updateTodos(newTodos);
  }

  function handleStorageToggle() {
    if (storageEnabled) {
      localStorage.setItem("storageDisabled", "true");
      localStorage.removeItem("todos");
      alert("Local storage disabled. Previously saved tasks have been removed.");
    } else {
      localStorage.removeItem("storageDisabled");
      localStorage.setItem("todos", JSON.stringify(todos));
      alert("Local storage enabled. Your tasks will now be saved.");
    }
    setStorageEnabled(!storageEnabled);
  }

  return (
    <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 min-h-screen text-white">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleStorageToggle}
          className="border rounded-lg px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
        >
          {storageEnabled ? "Disable Storage" : "Enable Storage"}
        </button>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-white font-bold mt-6 mb-4">
          MANAGE YOUR TASKS EFFECTIVELY!!
        </h1>
        <AddToDoComponent addTodos={addTodos} />
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSortByRecent(!sortByRecent)}
            className={`border rounded-lg p-2 ${sortByRecent ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-700 hover:bg-slate-600'} text-white`}
          >
            Sort: {sortByRecent ? 'Recent First' : 'Oldest First'}
          </button>
          <button
            onClick={() => setFilter("ALL")}
            className={`border rounded-lg p-2 ${filter === "ALL" ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-700 hover:bg-slate-600'} text-white`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter("COMPLETED")}
            className={`border rounded-lg p-2 ${filter === "COMPLETED" ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-700 hover:bg-slate-600'} text-white`}
          >
            Completed Tasks
          </button>
          <button
            onClick={() => setFilter("INCOMPLETE")}
            className={`border rounded-lg p-2 ${filter === "INCOMPLETE" ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-700 hover:bg-slate-600'} text-white`}
          >
            Incomplete Tasks
          </button>
        </div>
        <ToDoList
          todos={getFilteredAndSortedTodos()}
          deleteTodo={deleteTodo}
          toggleCompleted={toggleCompleted}
        />
      </div>
    </div>
  );
}

function ToDoList({ todos, deleteTodo, toggleCompleted }) {
  if (todos.length === 0) {
    return (
      <div className="w-fit flex-col">
        <p className="text-gray-300 text-lg font-medium p-4">No tasks to display</p>
      </div>
    );
  }

  return (
    <div className="w-fit flex-col">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={`p-2 flex justify-between border mt-2 border-purple-950 items-center ${
            todo.completed ? 'bg-emerald-100' : 'bg-slate-300'
          }`}
        >
          <p className={`mr-4 text-lg font-medium ${todo.completed ? 'line-through text-gray-600' : 'text-black'}`}>
            {todo.text}
          </p>
          <div className="flex gap-2">
            <button
              className="mr-2 border rounded-lg p-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
            <button
              className="border rounded-lg p-2 bg-emerald-700 hover:bg-emerald-800 text-white"
              onClick={() => toggleCompleted(todo.id)}
            >
              {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AddToDoComponent({ addTodos }) {
  const inputRef = useRef(null);
  return (
    <div className="flex ml-4 mt-6 mb-6">
      <input
        className="border border-slate-600 rounded-xl bg-slate-100 text-black h-10 w-96 mr-2 p-2"
        ref={inputRef}
        type="text"
        placeholder="Enter your task here ..."
      />
      <button
        className="border rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white p-2"
        onClick={() => {
          addTodos(inputRef.current.value);
          inputRef.current.value = "";
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

export default App;
