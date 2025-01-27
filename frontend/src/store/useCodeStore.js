import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';


const useCodeStore = create((set) => ({
    codeBlocks: [],
    currentBlock: null,
    isMentor: false,
    studentCount: 0,
    mentorPresent: false,
    loading: false,
    error: null,

    fetchCodeBlocks: async () => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get('/codeblocks');
            set({ codeBlocks: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    fetchCodeBlock: async (id) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get(`/codeblocks/${id}`);
            set({ currentBlock: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    updateCurrentBlock: (code) => {
        set((state) => ({
            currentBlock: { ...state.currentBlock, currentCode: code }
        }));
    },

    updateCodeBlockInLobby: (updatedBlock) => {
        set((state) => ({
            codeBlocks: state.codeBlocks.map(block =>
                block._id === updatedBlock._id
                    ? { ...block, ...updatedBlock }
                    : block
            )
        }));
    },

    setIsMentor: (value) => set({ isMentor: value }),
    setStudentCount: (count) => set({ studentCount: count }),
    setMentorPresent: (present) => set({ mentorPresent: present }),
    resetCurrentBlock: () => set({ currentBlock: null }),
}));

export default useCodeStore;