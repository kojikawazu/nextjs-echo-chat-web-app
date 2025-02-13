export const COMMON_CONSTANTS = {
    URL: {
        BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_URL + '/api',
        FETCH_ROOMS: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/rooms',
        FETCH_MESSAGES: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/rooms/:id/messages',
        CREATE_ROOM: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/rooms',
        CREATE_MESSAGE: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/messages',
        CREATE_LIKE: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/messages/:id/likes',
        DELETE_LIKE: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/messages/:id/likes',
    },
    LINK: {
        SIGN_IN: '/sign-in',
        SIGN_UP: '/sign-up',
    },
    MESSAGES: {
        LIKE: {
            ERROR_CREATE: 'いいねの作成に失敗しました',
            ERROR_DELETE: 'いいねの削除に失敗しました',
        },
        MESSAGE: {
            ERROR_CREATE: 'チャットメッセージの作成に失敗しました',
        },
    },
};