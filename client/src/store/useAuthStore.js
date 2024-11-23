import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser: res.data});
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
