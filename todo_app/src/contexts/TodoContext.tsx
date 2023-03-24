import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

import { AuthContext } from "./AuthContext";

interface Todo {
     readonly task_id: string;
     task_title: string;
     is_completed: boolean;
     created_at: string;
}

interface TodoContextValue {
     get_todos: () => Promise<void>;
     todos: Todo[];
}

interface Props {
     children: React.ReactNode;
}

export const TodoContext = createContext<TodoContextValue | null>(null);

export const TodoProvider: React.FC<Props> = ({ children }: Props) => {
     let authContext = useContext(AuthContext);
     const [todos, setTodos] = useState<Todo[]>([]);

     const get_todos = async () => {
          const request_instance = axios.create({
               headers: {
                    Authorization: `Bearer ${authContext?.authTokens?.access}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
               },
          });

          const response = await request_instance.get(
               "http://127.0.0.1:8000/tasks/",
          );

          if (response.status === 200) {
               setTodos(response.data);
          } else {
               console.log(response);
          }
     };

     const contextData = { get_todos, todos };

     useEffect(() => {
          get_todos();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     return (
          <TodoContext.Provider value={contextData}>
               {children}
          </TodoContext.Provider>
     );
};
