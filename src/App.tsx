import { useState, useEffect } from 'react'
import './App.css'
import { RenderList } from './RenderList.tsx';

type ToDo = {
  id: number;
  text: string;
  done: boolean;
};



function App() {
  const [newtoDo, setNewtoDo] = useState<string>("");
  const [toDoList, setToDoList] = useState<ToDo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editToDo, setEditToDo] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json()) 
      .then((data: ToDo[]) => {
        setToDoList(data);
      })
      .catch((err) => {
        console.error("Error fetching ToDos:", err);
      });
  }, []); 
   


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
          const newToDo = { text: newtoDo, done: false };
          fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newToDo),
          })
          .then((res) => res.json())
          .then((data: ToDo) => {
            setToDoList((prevList) => [...prevList, data]);
            setNewtoDo(""); 
          })
          .catch((err) => {
            console.error("Error adding ToDo:", err);
          });
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
