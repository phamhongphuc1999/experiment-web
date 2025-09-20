import { useEffect, useState } from 'react';
import TitleBox from 'src/components/box/TitleBox';
import CopyClipboard from 'src/components/CopyClipboard';
import BaseInput from 'src/components/input/BaseInput';
import { Button } from 'src/components/shadcn-ui/button';
import { useCaroConnectionStore } from 'src/states/caroConnection.state';

export default function ReceiveOffer() {
  const {
    yourRTC,
    friendRTC,
    events: { createConnectionForGuard },
  } = useCaroConnectionStore();
  const [rtc, setRtc] = useState<string>('');

  useEffect(() => {
    if (friendRTC) setRtc(JSON.stringify(friendRTC));
  }, [friendRTC]);

  function onCreateConnection() {
    createConnectionForGuard(JSON.parse(rtc) as RTCSessionDescriptionInit);
  }

  return (
    <div className="max-h-[200px] overflow-scroll">
      {!friendRTC && (
        <TitleBox
          valueProps={{ className: 'flex-1' }}
          title="Friend RTC"
          value={
            <BaseInput
              className="w-full"
              value={rtc}
              onChange={(event) => setRtc(event.target.value)}
              icon={{
                end: <Button onClick={onCreateConnection}>Create</Button>,
              }}
            />
          }
        />
      )}
      {rtc && (
        <TitleBox
          className="mt-2 items-start"
          valueProps={{ className: 'flex items-center w-[7rem]' }}
          title={
            <div className="flex items-center gap-2">
              <p>Your RTC</p>
              <CopyClipboard copyText={JSON.stringify(yourRTC)} iconprops={{ size: 16 }} />
            </div>
          }
          value={
            yourRTC ? (
              <div className="max-h-[100px] overflow-scroll">
                <pre className="m-0 w-full break-all whitespace-pre-wrap">
                  {JSON.stringify(yourRTC)}
                </pre>
              </div>
            ) : null
          }
        />
      )}
      {friendRTC && (
        <TitleBox
          className="mt-2 items-start"
          valueProps={{ className: 'flex items-center' }}
          title={
            <div>
              <p>Friend RTC</p>
              <CopyClipboard copyText={JSON.stringify(friendRTC)} iconprops={{ size: 16 }} />
            </div>
          }
          value={
            <div className="max-h-[100px] overflow-scroll">
              <pre className="m-0 w-full break-all whitespace-pre-wrap">
                {JSON.stringify(friendRTC)}
              </pre>
            </div>
          }
        />
      )}
    </div>
  );
}
