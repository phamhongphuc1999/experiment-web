'use client';

import ChatInput from './ChatInput';
import HomeHeader from './HomeHeader';
import MainMessage from './MainMessage';

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
    <div className="flex flex-1 flex-col">
      <HomeHeader />
      <MainMessage className="flex-1" />
      <ChatInput />
    </div>
  );
}
