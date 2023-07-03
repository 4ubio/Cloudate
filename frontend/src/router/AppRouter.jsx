import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../auth";
import { CalendarPage } from "../calendar";
import { CheckingAuth } from '../UI/'
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
    
    const {status, checkAuthToken} = useAuthStore();
    useEffect(() => {checkAuthToken();}, []);               //Login if JWT is still valid
    if(status === 'checking') {return (<CheckingAuth />)};
    
    return (
        <Routes>
            {
                (status === 'not-authenticated')
                ? ( //If not auth, only these will exists
                    <>
                        <Route path="/auth/login" element={<LoginPage />}/>
                        <Route path="/auth/register" element={<RegisterPage />}/>
                        <Route path="/*" element={<Navigate to="/auth/login"/>}/>
                    </>
                  )
                : ( //If auth, only these will exists
                    <>
                        <Route path="/" element={<CalendarPage />}/>
                        <Route path="/*" element={<Navigate to="/"/>}/>
                    </>
                  )
            }
        </Routes>
    )
}