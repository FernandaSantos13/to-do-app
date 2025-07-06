import { useState, useEffect } from 'react'
//import './App.css'
import { RenderList } from '../RenderList.tsx';
import { ToDo, api } from '../apiClient.ts';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';


export function ToDoList() {
    const [newtoDo, setNewtoDo] = useState<string>("");
    const [toDoList, setToDoList] = useState<ToDo[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        api.getAll()
            .then((data) => {
                setToDoList(data);
            })
            .catch((err) => {
                console.error("Error fetching ToDos:", err);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleSave = async () => {
        if (!newtoDo.trim()) {
            return;
        }
        const newToDo = { id: nanoid(), text: newtoDo, done: false };
        const serverToDo = await api.save(newToDo)
        setToDoList([...toDoList, serverToDo]);
        setNewtoDo("");
    }


    const handleDelete = async (todo: ToDo) => {
        const result = await api.delete(todo);

        if (result) {
            const updatedList = toDoList.filter((item) => todo.id !== item.id);
            setToDoList(updatedList);
        }
    };

    const handleToggleDone = async (todo: ToDo) => {
        const result = await api.update({
            ...todo,
            done: !todo.done
        });
        const updatedList = toDoList.map((item) => item.id === todo.id ? result : item);

        setToDoList(updatedList);
    };

    const handleSaveEdit = async (todo: ToDo) => {
        const result = await api.update(todo);
        const updatedList = toDoList.map((item) => item.id === todo.id ? result : item);
        setToDoList(updatedList);
    };

    return (
        <>
            <div className="header">
                <h1>To Do List App</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            
            <div className="add-todo">
                <textarea
                    value={newtoDo}
                    placeholder='Add ToDo here'
                    onChange={(e) => setNewtoDo(e.target.value)}
                    rows={2}
                    cols={30}
                />
                <button onClick={handleSave}>
                    Add ToDo
                </button>
            </div>
            <div className="to-do-list">
                <h2>ToDo List</h2>
                <ol>
                    <RenderList
                        toDoList={toDoList}
                        onDelete={handleDelete}
                        onToggleDone={handleToggleDone}
                        onSaveEdit={handleSaveEdit}
                    />
                </ol>
            </div>
        </>
    )
}