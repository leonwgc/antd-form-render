import React from 'react';
import { FormRenderProps } from './Types';
export { default as FormSpaceRender } from './SpaceLayout';
/**
 * 如果是一维数组，则从上往下一行放一个 item , 除非设置了cols=2/3/4 ,自动1行cols列布局
 * 如果是二维数组，则每个子数组元素的数量，则为一行显示的item数量 ,数量可以被24整除
 */
export default function FormRenderer({ layoutData, cols }: FormRenderProps): React.ReactElement;
