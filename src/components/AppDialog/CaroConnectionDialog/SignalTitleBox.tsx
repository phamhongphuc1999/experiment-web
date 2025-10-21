import { Fragment } from 'react';
import TitleBox from 'src/components/box/TitleBox';
import CopyClipboard from 'src/components/CopyClipboard';

interface Props {
  title: string;
  signal: string;
}

export default function SignalTitleBox({ title, signal }: Props) {
  return (
    <TitleBox
      className="mt-2 items-start"
      valueProps={{ className: 'flex items-center' }}
      title={
        <Fragment>
          <p className="text-sm">{title}</p>
          <CopyClipboard copyText={signal} iconprops={{ size: 16 }} />
        </Fragment>
      }
      value={
        <div className="max-h-[100px] overflow-scroll">
          <pre className="m-0 w-full text-[8px] break-all whitespace-pre-wrap">{signal}</pre>
        </div>
      }
    />
  );
}
