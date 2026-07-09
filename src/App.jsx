import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

export default function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }                    // key                   Updated array of todos

  useEffect(() => {                         //key
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      setTodos(JSON.parse(todoString))
    }
  }, [])

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }



  const handleEdit = (e, id) => {             //--> Move that task in input field by comparing id(given) with todos(array->id)
    let t = todos.filter((i) => i.id === id)  // return the match id in form of array(Only 1 element/index in this case)
    setTodo(t[0].todo)                        //Set value of todo & Show match id task in input field by assigning todo value in line 59
    //             -> ".todo" is key of object as others keys are id, isComplete etc

    let newTodos = todos.filter(item => { //--> Removes the task from list which is being edited
      return item.id !== id   // return array in which the given id not match with todos(array) id
    })                        // to remove the task from todo list
    setTodos(newTodos)        // todos contain array except that id element to be edit
    saveToLS(newTodos)
  }

  const handleDel = (e, id) => {    // Same work as in line 37

    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () => { // Copy todo with unique id, todo value & !completed into todos(array)
    const newTodos = [...todos, { id: uuidv4(), todo, isComplete: false }]
    setTodos(newTodos) // Copy the [todo value & so on] in todos array using spread operator"..."
    setTodo("")       // then set value of todo "empty"
    saveToLS(newTodos)
  }

  const handleChange = (e) => {   // When write something in input field, move that text in todo
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name        // Moves the task id present in name attribute(line 104) into id
    let index = todos.findIndex(item => {   // --> "findIndex" to find the index of task present in todos array
      return item.id === id;      // Compare item.id(todos->Array->id) with id(task id) & find the index in todos array, then move that index in "index"
    })
    let newTodos = [...todos];    // Copy the todos array in newTodos using spread operator"..."
    newTodos[index].isComplete = !newTodos[index].isComplete;   // Toggles the status. Update the task’s completion status.
    setTodos(newTodos)            // Update the todos content
    saveToLS(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container bg-slate-400 md:mx-auto my-10 rounded-xl p-5 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your ToDo's at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input type="text" onChange={handleChange} value={todo} className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-slate-700 disabled:bg-slate-600 hover:bg-slate-900 p-4 py-2 mx-2 text-white text-sm font-bold rounded-full'>
              Save
            </button>
          </div>
        </div>

        <input className='my-4' onChange={toggleFinished} type="checkbox" name="" checked={showFinished} />Show Finished
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

        <h2 className="font-bold text-xl">Your To-Do's</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No ToDo's to display</div>}
          {todos.map(item => {
            //          ->   the below line runs for each individual item/task 1-by-1. As it see first logic, if it's true, ignore 2nd logic & show all.
            //               But if 1st->false, then move to 2nd & if 2nd->true(means task is not complete) then show that single task. Otherwise not shown.
            //              >>> Note: the map func runs the code for single task & the below condition also evaluating the single task.
            return (showFinished || !item.isComplete) && <div key={item.id} className="todo flex my-3 justify-between w-[100%]">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isComplete} />
                <div className={item.isComplete ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-slate-700 hover:bg-slate-900 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDel(e, item.id) }} className='bg-slate-700 hover:bg-slate-900 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'><AiFillDelete /></button>
              </div>

            </div>
          })}
        </div>
      </div>
      <footer className="fixed bottom-3 left-0 w-full text-center py-2">
        Made with ❤️ By <b>"<a href="https://yourportfolio.com" target="_blank" rel="noopener noreferrer" className='font-bold hover:text-gray-700 hover:underline'>M Saif Ud Din</a>"</b>
      </footer>
    </>
  )
}