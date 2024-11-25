import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';


export const useChatStore = create((set) => ({
    messages: [],
    users:[],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
          const res = await axiosInstance.get("/message/users");
          set({ users: res.data.filteredUsers });
          console.log(res.data);
        } catch (error) {
          toast.error(error.response.data.msg);
        } finally {
          set({ isUsersLoading: false });
        }
      },
    getMessages : async (id) => {
        set({isMessageLoading : true});
        try {   
            const res = await axiosInstance.get(`/message/${id}`);
            console.log(res.data);
            set({messages: res.data});
        } catch (error) {
            toast.error(error.response.data.msg);
        } finally {
            set({isMessageLoading: false});
        }
    },
    setSelectedUser: (selectedUser) => {
        set({selectedUser});
    },
}));