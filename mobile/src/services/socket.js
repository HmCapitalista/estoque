import io from 'socket.io-client';

const client = io('http://168.228.219.200:45030');

export default client;