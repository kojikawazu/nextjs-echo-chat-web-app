export const COMMON_CONSTANTS = {
    URL: {
        BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_URL + '/api',
        FETCH_ROOMS: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/rooms',
        FETCH_MESSAGES: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/rooms/:id/messages',
        CREATE_ROOM: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/rooms',
        CREATE_MESSAGE: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/messages',
        CREATE_LIKE: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/messages/:id/likes',
        DELETE_LIKE: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/messages/:id/likes',

        WS: process.env.NEXT_PUBLIC_BACKEND_URL + '/ws',

        API_MESSAGE_CREATE: '/api/messages/create',
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
        ROOM: {
            ERROR_CREATE: 'チャットルームの作成に失敗しました',
        },
    },
    WEBSOCKET: {
        ERROR_CONNECT: 'WebSocket 接続に失敗しました',
        ERROR_DISCONNECT: 'WebSocket 接続が解除されました',
    },
};
