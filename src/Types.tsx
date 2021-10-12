import React from 'react';
import { Rule } from 'rc-field-form/lib/interface';
import type { SpaceProps } from 'antd';

export type FormRenderProps = {
  /**
   * 一维数组:从上往下一行放一个表单项 ,如果设置了cols=2/3/4 ,则一行放置cols(2/3/4)个表单项
   * 二维数组:子数组配置的表单项目会被渲染为一行
   */
  layoutData: Item[] | Item[][];
  cols?: 1 | 2 | 3 | 4;
};

export type SpaceLayoutProps = SpaceProps & {
  layoutData: Item[];
};

export type Item = {
  /** 组件类型，比如Input,Button,"input"  */
  type?: React.ComponentType | string;
  /** 传给Form.Item的name,作为form data的key */
  name?: string;
  /** label名称 */
  label?: string;
  /** 自定义render */
  render?: () => React.ReactNode;
  /** 动态返回Item，优先级高于render */
  getJSON?: () => Item | null;
  /** 组件的props,比如Button,Input的props,会透传给type定义的组件 */
  elProps?: Record<string, unknown>;
  /** Form.Item的props,会透传给Form.Item */
  itemProps?: Record<string, unknown>;
  /** Form.Item的rules,在itemProps里面定义也可,放这里主要为了兼容  */
  rules?: Rule[];
};

export type LayoutType = 'row' | 'space';
