import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

interface User {
     name: string;
     readonly user_id: string;
}

interface AuthTokens {
     access: string;
     refresh: string;
}

interface AuthContextType {
     user: User | null;
     authTokens: AuthTokens | null;
     loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
     userLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
     children: ReactNode;
}

const AuthProvider: React.FC = ({ children }: Props) => {
     const unauthorizedNotification = () => {
          console.log("Invalid Credentials");
     };

     // USE TO REDIRECT USERS
     const navigate = useNavigate();

     const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
          localStorage.getItem("authTokens")
               ? JSON.parse(localStorage.getItem("authTokens")!)
               : null,
     );

     const [user, setUser] = useState<User | null>(() =>
          localStorage.getItem("authTokens")
               ? (jwt_decode(localStorage.getItem("authTokens")!) as User)
               : null,
     );

     const [loading, setLoading] = useState(false);

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
                    const data = response.data;
                    setAuthTokens(data);
                    setUser(jwt_decode(data.access));
                    localStorage.setItem("authTokens", JSON.stringify(data));
                    navigate("/", { replace: true });
               }
          } catch (error) {
               unauthorizedNotification();
          }
     };

     const userLogout = () => {
          setAuthTokens(null);
          setUser(null);
          localStorage.removeItem("authTokens");
          navigate("/login", { replace: true });
     };

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

     const contextData = {
          user,
          authTokens,
          loginUser,
          userLogout,
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
          <AuthContext.Provider value={contextData}>
               {children}
          </AuthContext.Provider>
     );
};
