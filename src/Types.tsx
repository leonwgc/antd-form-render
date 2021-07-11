import React from 'react';
import { Rule } from 'rc-field-form/lib/interface';
import type { SpaceProps } from 'antd';

export type FormRenderProps = {
  layoutData: Item[] | Item[][];
  cols?: null | 1 | 2 | 3 | 4;
};

export type SpaceLayoutProps = SpaceProps & {
  layoutData: Item[];
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

export type LayoutType = 'row' | 'space';
