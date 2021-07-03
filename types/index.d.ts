import React from 'react';
import { Rule } from 'rc-field-form/lib/interface';
export declare type FormRenderProps = {
  layoutData: Item[] | Item[][] | unknown;
  cols?: null | 1 | 2 | 3 | 4;
};
export declare type Item = {
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
export default function FormRenderer({ layoutData, cols }: FormRenderProps): React.ReactElement;
