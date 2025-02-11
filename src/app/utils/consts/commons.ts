export const COMMON_CONSTANTS = {
    URL: {
        BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_URL + '/api',
        FETCH_ROOMS: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/rooms',
        FETCH_MESSAGES: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/rooms/:id/messages',
        CREATE_ROOM: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/rooms',
        CREATE_MESSAGE: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/messages',
    },
    LINK: {
        SIGN_IN: '/sign-in',
        SIGN_UP: '/sign-up',
    },
};
