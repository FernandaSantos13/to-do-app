import { useEffect, useState } from 'react';
import './App.css';
import { ToDo } from './apiClient';


export const RenderList = ({ toDoList, onDelete, onToggleDone, onSaveEdit }:
  {
    toDoList: ToDo[];
    onDelete: (todo: ToDo) => Promise<void>;
    onToggleDone: (todo: ToDo) => Promise<void>;
    onSaveEdit: (todo: ToDo) => Promise<void>;
  }) => {

  const [editToDo, setEditToDo] = useState<ToDo | undefined>(undefined);

  useEffect(() => {
    console.log("New toDoList:", toDoList);
  }, [toDoList]);

  const handleSaveEdit = async () => {
    if (!editToDo) {
      return;
    }

    await onSaveEdit(editToDo);
    setEditToDo(undefined);
  }

  return (
    <>
      {toDoList.map((toDo, index) => (
        <li key={index}>
          {editToDo && editToDo.id === toDo.id &&
            <div>
              <input
                type="text"
                value={editToDo.text}
                onChange={(e) => setEditToDo({
                  ...editToDo,
                  text: e.target.value,
                })}
              />
              <button onClick={handleSaveEdit}>SAVE</button>
            </div>}
          {editToDo?.id !== toDo.id && <>
            <span style={{ textDecoration: toDo.done ? 'line-through' : 'none' }}>
              {toDo.text}
            </span>
            <button onClick={() => onDelete(toDo)}>REMOVE</button>
            <button onClick={() => setEditToDo(toDo)}>EDIT</button>
            <button onClick={() => onToggleDone(toDo)}>DONE!</button>
          </>}
        </li>
      ))}
    </>
  )
}