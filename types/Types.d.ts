import React from 'react';
import { Rule } from 'rc-field-form/lib/interface';
import type { SpaceProps } from 'antd';
export declare type Item = {
  /** 组件类型，比如Input,Button,"input"  */
  type?: React.ComponentType | string;
  /** Form.Item name, 字段名，支持数组 */
  name?: string | Array<string | number>;
  /** Form.Item label, 标签的文本*/
  label?: React.ReactNode;
  /** 自定义渲染 */
  render?: () => React.ReactNode;
  /** 动态返回Item，优先级高于render */
  getJSON?: () => Item | null;
  /** 组件props,会透传给type定义的组件 */
  elProps?: Record<string, unknown>;
  /** Form.Item的props,会透传给Form.Item */
  itemProps?: Record<string, unknown>;
  /** Form.Itemrules,也可在itemProps里定义  */
  rules?: Rule[];
};
export declare type FormRenderProps = {
  /**
   * 1或2维数组，存储组件配置信息/自定义渲染组件
   */
  layoutData: Item[] | Item[][];
  /**
   * 定义一行渲染几个组件，layoutData为一维数组时生效, 可以是: 1 | 2 | 3 | 4, 默认1,
   */
  cols?: number;
};
export declare type SpaceLayoutProps = SpaceProps & {
  /**
   * 1维数组，存储组件配置信息/自定义渲染组件
   */
  layoutData: Item[];
};
export declare type LayoutType = 'row' | 'space';
