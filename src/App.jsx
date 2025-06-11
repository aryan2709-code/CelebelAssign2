import { useState } from "react"
import { useRef } from "react";

// We are trying to make a to-do application that validates to do tasks for empty tasks and tasks with a word limit of 100. ToDos can be sorted 
function App() {
const [todos , setTodos] = useState([]);

function addTodos(text) {
  // convert text to a object and then add to the todos array
  text = text.trim();
  if(text.length === 0 )
  {
    alert("A ToDo cannot be empty.");
    return;
  }
  if(text.length > 100)
  {
    alert("A ToDo description cannot be greater than 100 characters. Try to make it a little bit coincise.");
    return;
  }
  const task = {
    id : crypto.randomUUID(),
    completed : false,
    text : text,
    createdAt : Date.now()
  };
 // use the setTodos Function to add this todo into the existing todos
 setTodos((prev) => ([...prev,task]))
}

function toggleCompleted(id)
{
  setTodos((prev) => prev.map((todo) => todo.id === id ? {...todo , completed : !todo.completed} : todo ))
}

// function to delete the todo
function deleteTodo(id) 
{
   setTodos(prev => prev.filter(todo => todo.id !== id ));
}


// function to sort todos based on their arrival order , i.e time of creation
function sort() {
  const sorted = [...todos].sort((a,b) => b.createdAt - a.createdAt ) // [...todos creates a shallow copy ]
  setTodos(sorted)
}

return (
  <div className="flex flex-col  items-center bg-fuchsia-300 h-screen" >
     <h1 className="text-4xl text-gray-950 font-bold mt-2" >MANAGE YOUR TASKS EFFECTIVELY!!</h1>
     <AddToDoComponent addTodos = {addTodos} />
    <ToDoList todos = {todos} deleteTodo={deleteTodo} toggleCompleted = {toggleCompleted} />
  </div>
)


}

function ToDoList({todos , deleteTodo , toggleCompleted})
{
  
  return  <div className=" w-fit flex-col">
    {
      todos.map((todo) => (
        <div  key = {todo.id} className=" p-2 flex justify-between border mt-2 bg-slate-400 border-purple-950 items-center  ">
          <p className="mr-4 text-lg font-medium " >{ todo.text } </p>
          <div className="flex gap-2">
             <button className="mr-2 border rounded-lg p-2 bg-red-950 text-white  " onClick={() => deleteTodo(todo.id)} >Delete</button>
           <button  className="border rounded-lg p-2 bg-green-950 text-white " onClick={() => toggleCompleted(todo.id) } > {todo.completed ? "Mark as Incomplete" : "Mark as Complete" } </button>
             </div>
            
          </div>
      ))
    }
  </div>
}

function AddToDoComponent({addTodos}) {
   const inputRef = useRef(null);
   return <div className="flex ml-4 mt-6 mb-6 " >
    <input className=" border rounded-xl border-black h-10 w-96 mr-2 p-2 " ref={inputRef} type="text" placeholder="Enter Your task here ..."></input>
    <button className="border rounded-xl bg-slate-950 text-white p-2 " onClick={() => {addTodos(inputRef.current.value)
      inputRef.current.value = "";
    }} >Add Todo</button>
  </div>
}



export default App
