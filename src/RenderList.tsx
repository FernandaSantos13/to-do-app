import { useEffect } from 'react';
import './App.css'; 


export const RenderList = ({ toDoList, onDelete, onToggleDone, onEdit, onEditToDo, onSaveEdit, editIndex, editToDo }: 
  { toDoList: {text: string; done: boolean}[]; 
  onDelete: (index: number) => void;
  onToggleDone: (index: number) => void;
  onEdit: (index: number) => void;
  onEditToDo: (text: string) => void;
  onSaveEdit: () => void;
  editIndex: number | null;
  editToDo: string; 
}) => {

  useEffect (() => {
    console.log("New toDoList:", toDoList);
  }
  , [toDoList]);

  return (
    <>
      {toDoList.map((toDo, index) => (
        <li key={index}>
          {editIndex === index ? (
            <div>
              <input
                type="text"
                value={editToDo}
                onChange={(e) => onEditToDo(e.target.value)}
              />
              <button onClick={onSaveEdit}>SAVE</button>
            </div>
          ) : null}
          <span style={{textDecoration: toDo.done ? 'line-through' : 'none'}}>
            {toDo.text}
          </span>
          <button onClick={() => onDelete(index)}>REMOVE</button>
          <button onClick={() => onEdit(index)}>EDIT</button>
          <button onClick={() => onToggleDone(index)}>DONE!</button></li>
      ))}
    </>
  )
}