/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    const src: string;
    export default src;
}

declare module '@/axios' {
    import { AxiosInstance } from 'axios';
    const api: AxiosInstance;
    export default api;
}

declare module '@/stores/auth' {
    export function useAuthStore(): {
        user: { username?: string; email?: string; name?: string } | null;
        isAuthenticated: boolean;
        login: (username: string, password: string) => Promise<unknown>;
        logout: () => Promise<void>;
        fetchMe: () => Promise<unknown>;
    };
}

declare module '@/utils/version' {
    const version: string;
    export default version;
}

declare module 'vuetify/lib/components/VSnackbarQueue/VSnackbarQueue' {
    export interface SnackbarMessage {
        color?: string;
        text?: string;
    }
}
