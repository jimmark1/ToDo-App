import React, {
     useState,
     useEffect,
     createContext,
     useContext,
     MouseEvent,
} from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "./AuthContext";

interface Todo {
     readonly task_id: string;
     task_title: string;
     is_completed: boolean;
     created_at: string;
} // define the Todo interface

interface TodoContextValue {
     get_todos: () => Promise<void>;
     todos: Todo[];
     handle_todo: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
     task_title: string;
     setTaskTitle: (task_title: string) => void;
     edit_todo: (
          e: React.MouseEvent<HTMLButtonElement>,
          task_title: string,
          id: string,
     ) => Promise<void>;
     delete_todo: (
          e: React.MouseEvent<HTMLButtonElement>,
          id: string,
     ) => Promise<void>;
     complete_todo: (
          e: React.MouseEvent<HTMLButtonElement>,
          task_title: string,
          id: string,
     ) => Promise<void>;
} // define the TodoContextValue interface

interface Props {
     children: React.ReactNode;
} // define the Props interface

export const TodoContext = createContext<TodoContextValue | null>(null); // set the initial state of authTokens to null

export const TodoProvider: React.FC<Props> = ({ children }: Props) => {
     let authContext = useContext(AuthContext);
     const [todos, setTodos] = useState<Todo[]>([]); // set the initial state of Todos to null
     const [task_title, setTaskTitle] = useState(""); // set the initial state of task_title to null
     const [taskID, setTaskID] = useState(""); // set the initial state of taskID to null

     const get_todos = async () => {
          const request_instance = axios.create({
               headers: {
                    Authorization: `Bearer ${authContext?.authTokens?.access}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
               },
          }); // create an axios instance with the auth token

          // const response = await request_instance.get(
          //      "https://todo-api-production-065e.up.railway.app/tasks/",
          // );

          const response = await request_instance.get(
               "https://todo-api-xc4j.onrender.com/tasks/",
          );

          // get the todos from the API

          if (response.status === 200) {
               setTodos(response.data);
          } // if the response is successful, set the todos to the response data
     };

     const handle_todo = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          if (!taskID) {
               const request_instance = axios.create({
                    headers: {
                         Authorization: `Bearer ${authContext?.authTokens?.access}`,
                         "Content-Type": "application/json",
                         Accept: "application/json",
                    },
               }); // create an  axios instance with the auth token
               try {
                    // const response = await request_instance.post(
                    //      "https://todo-api-production-065e.up.railway.app/tasks/",
                    //      {
                    //           task_title: e.currentTarget.task_title.value,
                    //      },
                    // );

                    const response = await request_instance.post(
                         "https://todo-api-xc4j.onrender.com/tasks/",
                         {
                              task_title: e.currentTarget.task_title.value,
                         },
                    ); // post the task to the API

                    if (response.status === 200 || response.status === 201) {
                         get_todos();
                         setTaskTitle("");
                         toast.success(response.data.success, {
                              position: "top-right",
                              autoClose: 2000,
                              draggable: false,
                              theme: "colored",
                              closeButton: false,
                         });
                    }
               } catch (err) {
                    toast.error("Something went wrong", {
                         position: "top-right",
                         autoClose: 2000,
                         draggable: false,
                         theme: "colored",
                         closeButton: false,
                    });
               }
          } else {
               try {
                    // const response = await axios.put(
                    //      `https://todo-api-production-065e.up.railway.app/tasks/${taskID}/`,
                    //      {
                    //           task_title: e.currentTarget.task_title.value,
                    //      },
                    //      {
                    //           headers: {
                    //                Authorization: `Bearer ${authContext?.authTokens?.access}`,
                    //                "Content-Type": "application/json",
                    //                Accept: "application/json",
                    //           },
                    //      },
                    // );
                    const response = await axios.put(
                         `https://todo-api-xc4j.onrender.com/tasks/${taskID}/`,
                         {
                              task_title: e.currentTarget.task_title.value,
                         },
                         {
                              headers: {
                                   Authorization: `Bearer ${authContext?.authTokens?.access}`,
                                   "Content-Type": "application/json",
                                   Accept: "application/json",
                              },
                         },
                    );

                    if (response.status === 200 || response.status === 201) {
                         get_todos();
                         setTaskID("");
                         setTaskTitle("");
                         toast.success("Task updated successfully!", {
                              position: "top-right",
                              autoClose: 2000,
                              draggable: false,
                              theme: "colored",
                              closeButton: false,
                         });
                    }
               } catch (error) {
                    toast.error(
                         (error as AxiosError<any>).response?.data.error,
                         {
                              position: "top-right",
                              autoClose: 2000,
                              draggable: false,
                              theme: "colored",
                              closeButton: false,
                         },
                    );
               }
          }
     };

     const complete_todo = async (
          e: MouseEvent<HTMLButtonElement>,
          title: string,
          id: string,
     ) => {
          try {
               // const response = await axios.put(
               //      `https://todo-api-production-065e.up.railway.app/tasks/${id}/`,
               //      {
               //           task_title: title,
               //           is_completed: true,
               //      },
               //      {
               //           headers: {
               //                Authorization: `Bearer ${authContext?.authTokens?.access}`,
               //                "Content-Type": "application/json",
               //                Accept: "application/json",
               //           },
               //      },
               // );
               const response = await axios.put(
                    `https://todo-api-xc4j.onrender.com/tasks/${id}/`,
                    {
                         task_title: title,
                         is_completed: true,
                    },
                    {
                         headers: {
                              Authorization: `Bearer ${authContext?.authTokens?.access}`,
                              "Content-Type": "application/json",
                              Accept: "application/json",
                         },
                    },
               ); // mark the task as completed

               if (response.status === 200) {
                    get_todos();
                    toast.success(response.data.success, {
                         position: "top-right",
                         autoClose: 2000,
                         draggable: false,
                         theme: "colored",
                         closeButton: false,
                    });
               }
          } catch (error) {
               toast.error((error as AxiosError<any>).response?.data.error, {
                    position: "top-right",
                    autoClose: 2000,
                    draggable: false,
                    theme: "colored",
                    closeButton: false,
               });
          }
     };

     const edit_todo = async (
          e: MouseEvent<HTMLButtonElement>,
          id: string,
          task_title: string,
     ) => {
          setTaskTitle(task_title);
          setTaskID(id);
     };

     const delete_todo = async (
          e: MouseEvent<HTMLButtonElement>,
          id: string,
     ) => {
          const request_instance = axios.create({
               headers: {
                    Authorization: `Bearer ${authContext?.authTokens?.access}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
               },
          }); // create an  axios instance with the auth token
          try {
               // const response = await request_instance.delete(
               //      `https://todo-api-production-065e.up.railway.app/tasks/${id}/`,
               // );

               const response = await request_instance.delete(
                    `https://todo-api-xc4j.onrender.com/tasks/${id}/`,
               );

               if (response.status === 200) {
                    get_todos();
                    toast.success(response.data.success, {
                         position: "top-right",
                         autoClose: 2000,
                         draggable: false,
                         theme: "colored",
                         closeButton: false,
                    });
               }
          } catch (error) {
               toast.error((error as AxiosError<any>).response?.data.error, {
                    position: "top-right",
                    autoClose: 2000,
                    draggable: false,
                    theme: "colored",
                    closeButton: false,
               });
          }
     };

     const contextData = {
          get_todos,
          todos,
          handle_todo,
          task_title,
          setTaskTitle,
          edit_todo,
          delete_todo,
          complete_todo,
     }; // set the context data

     useEffect(() => {
          get_todos();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []); // get the todos on page load

     return (
          <TodoContext.Provider value={contextData}>
               {children}
          </TodoContext.Provider>
     );
}; // set the initial state of user to null
