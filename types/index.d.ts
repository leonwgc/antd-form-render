import React from 'react';
import { FormRenderProps } from './Types';
export { default as FormSpaceRender } from './SpaceLayout';
/**
 * 等分空间布局, 每个组件等分一行空间
 *
 * 一维数组:从上往下一行放一个组件 ,设置了cols则一行显示cols(1/2/3/4)个组件
 *
 * 二维数组:子数组配置的所有组件渲染为一行（不定列布局）
 *
 * 数组（或子数组）内组件会等分一行所占空间，内部采用Row,Col布局
 *
 * @export
 * @param {FormRenderProps} {
 *   layoutData,
 *   cols = 1 | 2 | 3 | 4,
 * }
 * @return {*}  {React.ReactElement}
 */
export default function FormRenderer({ layoutData, cols }: FormRenderProps): React.ReactElement;
