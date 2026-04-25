import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';
import { ReactJsonViewProps } from 'react-json-view';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

interface TProps extends ReactJsonViewProps {
  rootProps?: ComponentProps<'div'>;
}

export default function DynamicReactJson({ rootProps, ...props }: TProps) {
  return (
    <div {...rootProps}>
      <ReactJson {...props} />
    </div>
  );
}
