import { useDispatch, useSelector } from "react-redux"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

import calendarAPI from "../api/calendarApi";
import { onChecking, onLogin, onLogout, clearErrorMessage, onLogoutCalendar } from "../store";

const defaultPhoto = 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg';

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const googleProvider = new GoogleAuthProvider();

    const startCreating = async({name, email, password, photoURL = defaultPhoto}) => {
        dispatch(onChecking());
        try {
            const {data} = await calendarAPI.post('/auth/new', {name, email, password, photoURL});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid, photoURL: data.photoURL}));
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || 'Error creating user'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10000);
        }
    }

    const registerWithGoogle = async() => {
        dispatch(onChecking());
        try {
            const result = await signInWithPopup(FirebaseAuth, googleProvider);
            const {displayName, email, photoURL} = result.user;
            const {data} = await calendarAPI.post('/auth/new-google', {name: displayName, email, photoURL});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid, photoURL: data.photoURL}));
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || 'Error creating user with Google'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10000);
        }
    }

    const startLogin = async({email, password}) => {
        dispatch(onChecking());
        try {
            const {data} = await calendarAPI.post('/auth', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid, photoURL: data.photoURL}));
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || 'Error login user'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10000);
        }
    }

    const loginWithGoogle = async() => {
        dispatch(onChecking());
        try {
            const result = await signInWithPopup(FirebaseAuth, googleProvider);
            const {email} = result.user;
            const {data} = await calendarAPI.post('/auth/google', {email});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid, photoURL: data.photoURL}));
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || 'Error login user with Google'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10000);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {
            const {data} = await calendarAPI.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid, photoURL: data.photoURL}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        status, 
        user, 
        errorMessage, 
        startCreating,
        registerWithGoogle,
        startLogin,
        loginWithGoogle,
        checkAuthToken,
        startLogout
    }
}