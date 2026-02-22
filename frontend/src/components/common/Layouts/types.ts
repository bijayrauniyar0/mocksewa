import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";

export interface IFlexContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  gap?: number;
  row?: string;
  md?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface IGridContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "none";
  gap?: number;
}
