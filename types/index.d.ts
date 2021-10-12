import React from 'react';
import { FormRenderProps } from './Types';
export { default as FormSpaceRender } from './SpaceLayout';
/**
 * 一维数组:从上往下一行放一个表单项 ,如果设置了cols=2/3/4 ,则一行放置cols(2/3/4)个表单项
 * 二维数组:子数组配置的表单项目会被渲染为一行
 *
 * @export
 * @param {FormRenderProps} {
 *   layoutData,
 *   cols = 1,
 * }
 * @return {*}  {React.ReactElement}
 */
export default function FormRenderer({ layoutData, cols }: FormRenderProps): React.ReactElement;
