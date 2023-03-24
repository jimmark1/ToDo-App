import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
interface User {
     readonly _id: string;
     name: string;
}

interface AuthTokens {
     access: string;
     refresh: string;
}

interface AuthContextValue {
     user: User | null;
     authTokens: AuthTokens | null;
     login: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
     logout: () => void;
}
interface Props {
     children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
     const [isLoading, setIsLoading] = useState(false); // set the initial state of isLoading to false

     const invalidCredentials = () => {
          console.log("Invalid credentials");
     }; // log invalid credentials to the console

     const navigate = useNavigate(); // use the navigate hook from react-router-dom

     let [authTokens, setAuthTokens] = useState<AuthTokens | null>(
          () =>
               localStorage.getItem("authTokens")
                    ? JSON.parse(localStorage.getItem("authTokens")!) // if there are authTokens, parse them
                    : null, // if there are no authTokens, set it to null
     ); // set the initial state of authTokens to null

     const [user, setUser] = useState<User | null>(
          () =>
               localStorage.getItem("authTokens")
                    ? jwt_decode(localStorage.getItem("authTokens")!) // if there are authTokens, parse them
                    : null, // if there are no authTokens, set it to null
     ); // set the initial state of user to null

     const login = async (
          e: React.FormEvent<HTMLFormElement>,
     ): Promise<void> => {
          e.preventDefault();

          try {
               // console.log("Logging in");
               const response = await axios.post(
                    "http://127.0.0.1:8000/auth/token/",
                    {
                         username: e.currentTarget.username.value,
                         password: e.currentTarget.password.value,
                    },
               ); // send a post request to the backend with the username and password

               if (response.status === 200) {
                    localStorage.setItem(
                         "authTokens",
                         JSON.stringify(response.data),
                    );
                    setAuthTokens(response.data);
                    setUser(jwt_decode(response.data.access));
                    navigate("/", { replace: true });
               } // if the response status is 200, set the authTokens and user
          } catch (err) {
               invalidCredentials();
          } // if there is an error, log it to the console
     };

     const logout = () => {
          setAuthTokens(null);
          setUser(null);
          localStorage.removeItem("authTokens");
          navigate("/login", { replace: true });
     }; // set the authTokens and user to null, remove the authTokens from localStorage, and navigate to the login page

     const updateTokens = async () => {
          try {
               const response = await axios.post(
                    "http://127.0.0.1:8000/auth/token/refresh/",
                    {
                         refresh: authTokens?.refresh,
                    },
               ); // send a post request to the backend with the refresh token

               if (response.status === 200) {
                    setAuthTokens(response.data);
                    setUser(jwt_decode(response.data.access));
                    localStorage.setItem(
                         "authTokens",
                         JSON.stringify(response.data),
                    ); // if the response status is 200, set the authTokens and user
               }
          } catch (err) {
               logout();
          }

          if (isLoading) {
               setIsLoading(false);
          }
     }; // update the access and refresh tokens

     const contextData = {
          user: user,
          authTokens: authTokens,

          login: login,
          logout: logout,
     }; // set the context data

     useEffect(() => {
          if (isLoading) {
               updateTokens();
          }

          const timeInterval = 1000 * 60 * 3; // 3 minutes

          const interval = setInterval(() => {
               if (authTokens) {
                    updateTokens();
               }
          }, timeInterval);
          return () => clearInterval(interval);
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [authTokens, isLoading]);

     return (
          <AuthContext.Provider value={contextData}>
               {children}
          </AuthContext.Provider> // return the context provider
     );
}; // set the initial state of authTokens to null
