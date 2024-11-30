import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    socketConnect:() =>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;  // to check if the user is not authorised then dont create the socketID or if the socket is already connected 

        const socketFunc = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socketFunc.connect();
        set({socket: socketFunc});

        socketFunc.on('onlineUsers', (userIds) => {
            set({onlineUsers: userIds});
        });
    },
    socketDisconnect:() =>{
        if(get().socket?.connected) {
            get().socket.disconnect();
        }
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser: res.data});
            get().socketConnect(); //because we will be logged in when we check auth
        } catch (error) {
            console.log("error at useAuthStore", error);
            set({authUser: null});
        }   
        finally {
            set({isCheckingAuth: false});
        }
    },  

    signup: async (data) => {
        set ({isSigningUp: true});
        try {
            const res = await axiosInstance.post('auth/signup', data);
            set({authUser: res.data});  // auth the user as soon as they signup
            toast.success("signup successful");
            get().socketConnect();
        } catch (error) {
            toast.error(error.response.data.msg);
        } finally {
            set({isSigningUp: false});
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({authUser: res.data});
            toast.success("Logged successful");
            get().socketConnect();
        } catch (error) {
            toast.error(error.response.data.msg);
        } finally {
            set({isLoggingIn: false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser: null});
            toast.success("logout successful");
            get().socketDisconnect();
        } catch (error) {
            toast.error("Something went wrong");
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put('/auth/update', data);
            set({authUser: res.data});
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            set({isUpdatingProfile: false});
        }
    }

}));
