import React from 'react';
import { Rule } from 'rc-field-form/lib/interface';
export declare type FormRenderProps = {
    layoutData: Array<Item>;
    cols: null | 1 | 2 | 3 | 4;
};
export declare type Item = {
    type?: React.ComponentType | string;
    name?: string;
    label?: string;
    render?: () => React.ReactNode;
    getJSON?: () => Item | null;
    elProps?: Record<string, unknown>;
    itemProps?: Record<string, unknown>;
    rules?: Rule[];
};
export default function FormRenderer({ layoutData, cols }: FormRenderProps): React.ReactNode;
