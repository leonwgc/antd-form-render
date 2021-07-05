import React from 'react';
import { Rule } from 'rc-field-form/lib/interface';

export type FormRenderProps = {
  layoutData: Item[] | Item[][];
  cols?: null | 1 | 2 | 3 | 4;
};

export type SpaceLayoutProps = {
  layoutData: Item[];
  space: number | number[];
};

export type Item = {
  type?: React.ComponentType | string;
  name?: string;
  label?: string;
  render?: () => React.ReactElement;
  getJSON?: () => Item | null;
  elProps?: Record<string | number | symbol, unknown>;
  itemProps?: Record<string | number | symbol, unknown>;
  rules?: Rule[];
  [p: string]: unknown;
};

export type LayoutType = 'flex' | 'space';
