import { useState } from 'react'
import './App.css'
import { RenderList } from './RenderList.tsx';

function App() {
  const [newtoDo, setNewtoDo] = useState<string>("");
  const [toDoList, setToDoList] = useState<{text: string; done: boolean}[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editToDo, setEditToDo] = useState<string>("");

  const handleDelete = (index: number) => {
    const updatedList = toDoList.filter((_, i) => i !== index);
    setToDoList(updatedList);
  };
  
  const handleToggleDone = (index: number) => {
    const updatedList = toDoList.map((toDo, i) => {
      if (i === index) {
        return { ...toDo, done: !toDo.done }; 
      }
      return toDo;
    });
    setToDoList(updatedList);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditToDo(toDoList[index].text);
  };

  const handleSaveEdit = () => {
    if (editIndex === null) return;

    const updatedList = toDoList.map((toDo, i) => {
      if ( i === editIndex) {
        return { ...toDo, text: editToDo }; 
      }
      return toDo;
    });

    setToDoList(updatedList);
    setEditIndex(null);
    setEditToDo("");
  };
  
  return (
    <>
      <h1>To Do List App</h1>
      <div className="add-todo">
        <textarea
          value={newtoDo}
          placeholder='Add ToDo here'
          onChange={(e) => setNewtoDo(e.target.value)}
          rows={2}
          cols={30}
        />
        <button onClick={() => {
          if(!newtoDo.trim()) return;
          const newItem = { text: newtoDo, done: false };
          const updatedList = [...toDoList, newItem];
          setToDoList(updatedList);
          setNewtoDo("");
        }}>
          Add ToDo
        </button>
      </div>
      <div className="to-do-list">
        <h2>ToDo List</h2>
        <ol> 
          <RenderList 
            toDoList = {toDoList} 
            onDelete={handleDelete} 
            onToggleDone={handleToggleDone}
            onEdit={handleEdit}
            onEditToDo={setEditToDo}
            onSaveEdit={handleSaveEdit}
            editIndex={editIndex}
            editToDo={editToDo}          
            />
        </ol>
      </div>
    </>
  )
}

export default App
