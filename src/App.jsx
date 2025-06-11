import { useState } from "react"

// We are trying to make a to-do application that validates to do tasks for empty tasks and tasks with a word limit of 100. ToDos can be sorted 
function App() {
const [todos , setTodos] = useState([]);

function addTodos(text) {
  // convert text to a object and then add to the todos array
  text = text.trim();
  if(text.length() === 0 )
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


function deleteTodo(id){
  //filter the todos array based on this unique id created
  todos.filter(todo => todo.id != id)
}

// function to sort todos based on their arrival order , i.e time of creation
function sort() {
  [...todos].sort((a,b) => b.createdAt - a.createdAt ) // [...todos creates a shallow copy ]
}


}



export default App
