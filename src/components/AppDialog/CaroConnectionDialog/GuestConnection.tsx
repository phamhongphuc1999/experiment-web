import { Fragment, useState } from 'react';
import BaseInput from 'src/components/input/BaseInput';
import { Button } from 'src/components/shadcn-ui/button';
import { useCaroConnectionContext } from 'src/context/caro-connection.context';
import SignalTitleBox from './SignalTitleBox';

export default function GuestConnection() {
  const {
    peer,
    yourSignal,
    friendSignal,
    events: { initConnection, setFriendSignal },
  } = useCaroConnectionContext();
  const [signal, setSignal] = useState('');

  return (
    <Fragment>
      {peer ? (
        <Fragment>
          {friendSignal ? (
            <Fragment>
              <SignalTitleBox title="Your signal" signal={yourSignal} />
              <SignalTitleBox title="Friend signal" signal={friendSignal} />
            </Fragment>
          ) : (
            <BaseInput
              placeholder="Friend signal"
              name="guest-friend-signal"
              value={signal}
              onChange={(event) => setSignal(event.target.value)}
              icon={{ end: <Button onClick={() => setFriendSignal(signal)}>Confirm</Button> }}
            />
          )}
        </Fragment>
      ) : (
        <Button onClick={() => initConnection('guest')}>Connect</Button>
      )}
    </Fragment>
  );
}
