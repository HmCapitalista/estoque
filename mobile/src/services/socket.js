import io from 'socket.io-client';

const client = io('http://localhost:80');

export default client;