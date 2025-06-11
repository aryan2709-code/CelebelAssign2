import { useState, useRef } from "react";

function App() {
  // Load initial data
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [storageEnabled, setStorageEnabled] = useState(() => {
    return localStorage.getItem("storageDisabled") !== "true";
  });
  
  const [sortByRecent, setSortByRecent] = useState(true);
  const [filter, setFilter] = useState("ALL"); // "ALL", "COMPLETED", "INCOMPLETE"

  // Filter and sort todos for display
  const getFilteredAndSortedTodos = () => {
    let filteredTodos = todos;
    
    // Apply filter
    if (filter === "COMPLETED") {
      filteredTodos = todos.filter(todo => todo.completed);
    } else if (filter === "INCOMPLETE") {
      filteredTodos = todos.filter(todo => !todo.completed);
    }
    
    // Apply sort
    if (sortByRecent) {
      return [...filteredTodos].sort((a, b) => b.createdAt - a.createdAt); // Recent first
    } else {
      return [...filteredTodos].sort((a, b) => a.createdAt - b.createdAt); // Oldest first
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
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    updateTodos(newTodos);
  }

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    updateTodos(newTodos);
  }

  function handleStorageToggle() {
    if (storageEnabled) {
      // Disable storage
      localStorage.setItem("storageDisabled", "true");
      localStorage.removeItem("todos");
      alert("Local storage disabled. Previously saved tasks have been removed.");
    } else {
      // Enable storage
      localStorage.removeItem("storageDisabled");
      localStorage.setItem("todos", JSON.stringify(todos));
      alert("Local storage enabled. Your tasks will now be saved.");
    }
    setStorageEnabled(!storageEnabled);
  }

  return (
    <div className="relative bg-fuchsia-300 h-screen">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleStorageToggle}
          className="border rounded-lg px-4 py-2 bg-orange-500 text-black font-semibold"
        >
          {storageEnabled ? "Disable Storage" : "Enable Storage"}
        </button>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-gray-950 font-bold mt-2">
          MANAGE YOUR TASKS EFFECTIVELY!!
        </h1>
        <AddToDoComponent addTodos={addTodos} />
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setSortByRecent(!sortByRecent)}
            className={`border rounded-lg p-2 ${sortByRecent ? 'bg-blue-600' : 'bg-slate-800'} text-white`}
          >
            Sort: {sortByRecent ? 'Recent First' : 'Oldest First'}
          </button>
          <button 
            onClick={() => setFilter("ALL")}
            className={`border rounded-lg p-2 ${filter === "ALL" ? 'bg-blue-600' : 'bg-slate-800'} text-white`}
          >
            All Tasks
          </button>
          <button 
            onClick={() => setFilter("COMPLETED")}
            className={`border rounded-lg p-2 ${filter === "COMPLETED" ? 'bg-blue-600' : 'bg-slate-800'} text-white`}
          >
            Completed Tasks
          </button>
          <button 
            onClick={() => setFilter("INCOMPLETE")}
            className={`border rounded-lg p-2 ${filter === "INCOMPLETE" ? 'bg-blue-600' : 'bg-slate-800'} text-white`}
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
        <p className="text-gray-700 text-lg font-medium p-4">No tasks to display</p>
      </div>
    );
  }

  return (
    <div className="w-fit flex-col">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`p-2 flex justify-between border mt-2 border-purple-950 items-center ${
            todo.completed ? 'bg-green-200' : 'bg-slate-400'
          }`}
        >
          <p className={`mr-4 text-lg font-medium ${todo.completed ? 'line-through text-gray-600' : ''}`}>
            {todo.text}
          </p>
          <div className="flex gap-2">
            <button
              className="mr-2 border rounded-lg p-2 bg-red-950 text-white"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
            <button
              className="border rounded-lg p-2 bg-green-950 text-white"
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
        className="border rounded-xl border-black h-10 w-96 mr-2 p-2"
        ref={inputRef}
        type="text"
        placeholder="Enter Your task here ..."
      />
      <button
        className="border rounded-xl bg-slate-950 text-white p-2"
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

