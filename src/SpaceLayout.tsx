import React from 'react';
import { Space } from 'antd';
import { SpaceLayoutProps, Item } from './Types';
import ItemRender from './ItemRender';
/**
 * 等间距排列 (常用于列表页面的搜索等)
 *
 * @export
 * @param {SpaceLayoutProps} {
 *   layoutData,
 *   ...props 参考：antd Space组件的props
 * }
 */
const SpaceLayout: React.FC<SpaceLayoutProps> = ({
  /**
   * 1维数组，存储组件配置信息/自定义渲染组件
   */
  layoutData,
  ...props
}) => {
  return (
    <Space {...props}>
      {(layoutData as Item[]).map((item, idx) => (
        <ItemRender item={item} key={idx} layoutType="space" />
      ))}
    </Space>
  );
};

export default SpaceLayout;
