export interface AppConstant {
    login: string;
    logout: string;
    refresh: string;
    me: string;
}

const constant: AppConstant = {
    // Auth endpoints
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
};

export default constant;
