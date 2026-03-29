import { DefaultError, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { LucideProps } from 'lucide-react';
import { ComponentProps, RefAttributes } from 'react';

export type ThemeType = 'light' | 'dark';
export type PositionType = [number, number]; // expect [row, column]
export type VectorType = PositionType; // expect [x, y]

export enum SoundType {
  CLICK = 'click',
  MOVE = 'move',
  SUCCESS = 'success',
  ERROR = 'error',
  BACKGROUND = 'background',
}

export type SoundConfigType = {
  type: SoundType;
  loop?: boolean;
  volume?: number;
  isEnabled?: boolean;
};

export type IconProps = Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>;

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

export type MutationOptionsWithoutFn<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TOnMutateResult>, 'mutationFn'>;

export type MutationOptionsDefaultError<
  TData = unknown,
  TVariables = void,
  TOnMutateResult = unknown,
> = MutationOptionsWithoutFn<TData, Error, TVariables, TOnMutateResult>;

export type BaseQueryInstance = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig): Promise<T>;
  put<T = unknown, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig): Promise<T>;
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
};

export type PaginationResponseType = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};
