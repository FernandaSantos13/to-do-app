import { get } from "react-hook-form";

export type ToDo = {
    id: string;
    text: string;
    done: boolean;
  };


  const baseUrl = "http://localhost:3000/todos";

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'user-id': localStorage.getItem('userId') || '',
  });

  export const api = {
    getAll: async () => {
        const res = await fetch(baseUrl, {
            headers: getHeaders(),
        });
        if (!res.ok) {
            throw new Error("Failed to fetch ToDos");
        }

        const result = await res.json();

        return result as ToDo[];
    },

    save: async (todo: ToDo) => {
        const res = await fetch(baseUrl, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(todo),
        });

        if (!res.ok) {
            throw new Error("Failed to save ToDo");
        }

        const result = await res.json()

        return result as ToDo;
    },

    delete: async (todo: ToDo) => {
        const res = await fetch(`${baseUrl}/${todo.id}`, {
            method: "DELETE",
            headers: getHeaders(),
        });

        const result = res.ok;

        return result;
    },

    update: async (todo: ToDo) => {
        const res = await fetch(`${baseUrl}/${todo.id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(todo),
        });

        if (!res.ok) {
            throw new Error("Failed to update ToDo");
        }

        const result = await res.json()

        return result as ToDo;
    }
}