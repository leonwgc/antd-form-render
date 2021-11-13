import React from 'react';
import { SpaceLayoutProps } from './Types';
/**
 * 等间距排列 (常用于列表页面的搜索等)
 *
 * @export
 * @param {SpaceLayoutProps} {
 *   layoutData,
 *   ...props 参考：antd Space组件的props
 * }
 * @return {*}  {React.ReactElement}
 */
export default function SpaceLayout({
  /**
   * 1维数组，存储组件配置信息/自定义渲染组件
   */
  layoutData,
  ...props
}: SpaceLayoutProps): React.ReactElement;
