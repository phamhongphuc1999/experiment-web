import { UseQueryOptions } from '@tanstack/react-query';
import { ComponentProps } from 'react';

export type ThemeType = 'light' | 'dark';
export type PositionType = [number, number]; // expect [row, column]
export type VectorType = PositionType; // expect [x, y]

export enum ENV_TYPE {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export interface AnimationComponentProps {
  size?: number | string;
  color?: string;
}

export interface AnimationComponentDivProps<
  T = AnimationComponentProps,
> extends ComponentProps<'div'> {
  iconProps?: T;
}

export type OptionalQueryType<T = unknown> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;

export type JsonType =
  | string
  | number
  | Array<string>
  | Array<number>
  | { [index: string | number]: JsonType };

export type PageMetadataType = Partial<{
  title: string;
  description: string;
  url: string;
  siteName: string;
  twitterHandle: string;
  icon: string;
  image: string;
  keywords: string;
}>;
