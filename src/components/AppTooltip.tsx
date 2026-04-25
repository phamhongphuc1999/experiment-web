import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './shadcn/tooltip';
import { TooltipContentProps } from '@radix-ui/react-tooltip';

interface TProps {
  tooltipContent?: ReactNode;
  contentProps?: TooltipContentProps;
  children?: ReactNode;
}

export default function AppTooltip({ tooltipContent, contentProps, children }: TProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild className="cursor-pointer">
        {children}
      </TooltipTrigger>
      <TooltipContent {...contentProps}>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}
