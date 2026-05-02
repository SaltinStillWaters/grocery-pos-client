import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/axios';
import router from '@/router';

export interface User {
    id?: number;
    username?: string;
    email?: string;
    name?: string;
    [key: string]: unknown;
}

export const useAuthStore = defineStore('auth', () => {
    const storedUser = localStorage.getItem('user');

    const initialUser: User | null =
        storedUser && storedUser !== 'undefined'
            ? (JSON.parse(storedUser) as User)
            : null;

    const user = ref<User | null>(initialUser);

    const isAuthenticated = computed(
        () =>
            !!user.value &&
            document.cookie.split('; ').some((row) => row.startsWith('dummy')),
    );

    const login = async (
        username: string,
        password: string,
    ): Promise<unknown> => {
        const response = await api.post('/auth/login', { username, password });
        const data = response.data.data;
        console.log({ data });
        user.value = data.user;

        localStorage.setItem('user', JSON.stringify(data.user));

        return data;
    };

    const logout = async (): Promise<void> => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            console.log(e);
            // silent fail - still clear local state
        } finally {
            user.value = null;
            localStorage.removeItem('user');
            router.push({ name: 'Login' });
        }
    };

    const fetchMe = async (): Promise<User | null> => {
        try {
            const response = await api.get('/auth/profile');
            user.value = response.data.data;
            console.log(user.value);
            localStorage.setItem('user', JSON.stringify(user.value));
            return user.value;
        } catch (err) {
            user.value = null;
            localStorage.removeItem('user');
            throw err;
        }
    };

    return { user, isAuthenticated, login, logout, fetchMe };
});
