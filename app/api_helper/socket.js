import io from 'socket.io-client';

import { SOCKET_URL } from './../config';

const socket = io(SOCKET_URL, {
  autoConnect: false,
  secure: true
});

socket.on(
  'connect',
  () => console.warn('Connected!')
);

// socket.on(
//   'disconnect',
//   () => {
//     console.warn('Disconnected!');
//     socket.close();
//   }
// );

socket.on(
  'error',
  (msg) => console.error('Error!', msg)
);

export default socket;
