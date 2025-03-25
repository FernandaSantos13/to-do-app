import { useState } from 'react'
import './App.css'

function App() {
  const [newtoDo, setNewtoDo] = useState<string>("");
  const [toDoList, setToDoList] = useState<string[]>([]);

  return (
    <>
      <h1>To Do List App</h1>
      <div className="add-todo">
        <textarea
          value={0}
          placeholder='Add ToDo here'
          onChange={(e) => setNewtoDo(e.target.value)}
          rows={10}
          cols={30}
        />
        <button onClick={UpdateToDoList}>
          Add ToDo
        </button>
      </div>
      <div className="to-do-list">
        <h2>ToDo List</h2>
        <ol>{RenderList}</ol>
      </div>
    </>
  )
}

export default App
