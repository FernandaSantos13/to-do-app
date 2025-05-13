export type ToDo = {
    id: string;
    text: string;
    done: boolean;
  };


  const baseUrl = "http://localhost:3000/todos";

  export const api = {
    getAll: async () => {
        const res = await fetch(baseUrl);
        const result = await res.json();

        return result as ToDo[];
    },
    save: async (todo: ToDo) => {
        const res = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });

        const result = await res.json()

        return result as ToDo;
    },
    delete: async (todo: ToDo) => {
        const res = await fetch(`${baseUrl}/${todo.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = res.ok;

        return result;
    },
    update: async (todo: ToDo) => {
        const res = await fetch(`${baseUrl}/${todo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });

        const result = await res.json()

        return result as ToDo;
    }
}