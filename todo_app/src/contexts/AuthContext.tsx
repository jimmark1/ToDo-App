import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

/*
 * @description
 * USER TYPE
 */
interface User {
     exp: number;
     iat: number;
     user_id: string;
}
/*
 * @description
 * AUTHENTICATION TOKENS TYPE
 */
interface AuthTokens {
     access: string;
     refresh: string;
}

/*
 * @description
 * AUTHENTICATION CONTEXT TYPE
 */
interface AuthContextType {
     user: User | null;
     authTokens: AuthTokens | null;
     loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
     userLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
     children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
     // NOTIFICATION FOR INVALID CREDENTIALS
     const unauthorizedNotification = () => {
          console.log("Invalid Credentials");
     };

     // USE TO REDIRECT USERS
     const navigate = useNavigate();

     /*
      * @description
      * SETS THE AUTHENTICATION TOKENS
      *
      */
     const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
          localStorage.getItem("authTokens")
               ? JSON.parse(localStorage.getItem("authTokens")!)
               : null,
     );

     /*
      * @description
      * GETS THE USER FROM THE AUTHENTICATION TOKENS
      */
     const [user, setUser] = useState<User | null>(() =>
          localStorage.getItem("authTokens")
               ? (jwt_decode(localStorage.getItem("authTokens")!) as User)
               : null,
     );

     /*
      * @description
      * SETS THE AUTHENTICATION TOKENS
      */
     const [loading, setLoading] = useState(false);

     /*
      * @description
      * LOGS THE USER IN
      */
     const loginUser = async (
          e: React.FormEvent<HTMLFormElement>,
     ): Promise<void> => {
          e.preventDefault();

          try {
               const response = await axios.post("127.0.0.1:8000/api/token/", {
                    username: e.currentTarget.username.value,
                    password: e.currentTarget.password.value,
               });

               if (response.status === 200) {
                    /*
                     * @description
                     * SETS THE AUTHENTICATION TOKENS
                     */
                    const data = response.data;
                    setAuthTokens(data);
                    setUser(jwt_decode(data.access) as User);
                    localStorage.setItem("authTokens", JSON.stringify(data));
                    navigate("/", { replace: true });
               }
          } catch (error) {
               unauthorizedNotification();
          }
     };

     /*
      * @description
      * LOGS THE USER OUT
      */
     const userLogout = () => {
          setAuthTokens(null);
          setUser(null);
          localStorage.removeItem("authTokens");
          navigate("/login", { replace: true });
     };

     /*
      * @description
      * UPDATES THE ACCESS TOKEN
      */
     const updateToken = async () => {
          try {
               console.log("Updating Token");
               const response = await axios.post(
                    "127.0.0.1:8000/api/token/refresh/",
                    {
                         refresh: authTokens?.refresh,
                    },
               );

               const data = response.data;
               setAuthTokens(data);
               setUser(jwt_decode(data.access));
               localStorage.setItem("access_token", JSON.stringify(data));
          } catch (error) {
               userLogout();
          }

          if (loading) {
               setLoading(false);
          }
     };

     useEffect(() => {
          if (loading) {
               updateToken();
          }

          let timeInterval = 1000 * 60 * 2;

          let interval = setInterval(() => {
               if (authTokens) {
                    updateToken();
               }
          }, timeInterval);
          return () => clearInterval(interval);
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [authTokens, loading]);

     return (
          <AuthContext.Provider
               value={{
                    user,
                    authTokens,
                    loginUser,
                    userLogout,
               }}>
               {loading ? null : children}
          </AuthContext.Provider>
     );
};
