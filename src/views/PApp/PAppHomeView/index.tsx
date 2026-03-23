'use client';

import Overview from './Overview';

export default function PAppHomeView() {
  // const { socket } = useSocket();

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on('events', (data) => {
  //     console.log('🚀 ~ PAppHomeView ~ data:', data);
  //   });

  //   return () => {
  //     socket.off('events');
  //   };
  // }, [socket]);

  // function abc() {
  //   console.log('socket: ', socket);
  //   if (socket) socket.emit(MICROSERVICE_EVENTS.WEBSOCKET_MESSAGE, { foo: 'bar' });
  // }

  return (
    <div>
      <Overview />
    </div>
  );
}
