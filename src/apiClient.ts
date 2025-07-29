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
};

export const auth = {
    login: async (email: string): Promise< {userId: string}> => {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email}),
        });

        if (!res.ok) {
            const errorData =  await res.json();
            throw new Error(errorData.error || "Login failed");
        }

        return res.json();
    },
    signup: async (name: string, email: string): Promise<{ userId: string }> => {
        const res = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        });
    
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Sign up failed");
        }
    
        return res.json();
      }
};