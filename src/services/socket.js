import { io } from 'socket.io-client';

export const socket = io(
    'https://chromatyk-server.cleverapps.io',
    {
        withCredentials: true
    }
);