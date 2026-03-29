import { ComponentProps } from 'react';
import Conversation from './Conversation';

export default function HomeHeader(props: ComponentProps<'div'>) {
  return (
    <div {...props}>
      <Conversation />
    </div>
  );
}
