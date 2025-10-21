import ConnectFourConnectionProvider from 'src/context/connect-four-connection.context';

export default function ConnectFourView() {
  return (
    <ConnectFourConnectionProvider>
      <div className="mx-8 flex h-full justify-center gap-2 py-4"></div>
    </ConnectFourConnectionProvider>
  );
}
