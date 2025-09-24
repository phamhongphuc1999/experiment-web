import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './shadcn-ui/tooltip';
import { TooltipContentProps } from '@radix-ui/react-tooltip';

interface Props {
  tooltipContent?: ReactNode;
  contentProps?: TooltipContentProps;
  children?: ReactNode;
}

export default function AppTooltip({ tooltipContent, contentProps, children }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild className="cursor-pointer">
        {children}
      </TooltipTrigger>
      <TooltipContent {...contentProps}>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}
