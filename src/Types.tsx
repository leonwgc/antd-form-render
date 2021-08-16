import React from 'react';
import { Rule } from 'rc-field-form/lib/interface';
import type { SpaceProps } from 'antd';

export type FormRenderProps = {
  layoutData: Item[] | Item[][];
  cols?: 1 | 2 | 3 | 4 | number;
};

export type SpaceLayoutProps = SpaceProps & {
  layoutData: Item[];
};

export type Item = {
  type?: React.ComponentType | string /** 组件类型，比如Input,Button,"input"  */;
  name?: string /** 传给Form.Item的name,作为form data的key */;
  label?: string /** label名称 */;
  render?: () => React.ReactNode /** 自定义render ,返回任何内容都可 */;
  getJSON?: () => Item | null /** 动态返回Item */;
  elProps?: Record<
    string | number | symbol,
    unknown
  > /** 组件的props， 比如Button,Input 的props , 参考antd文档配置 */;
  itemProps?: Record<string | number | symbol, unknown> /** Form.Item的props, 参考antd文档配置  */;
  rules?: Rule[] /** Form.Item的rules,在itemProps里面定义也可,放这里主要为了兼容旧代码   */;
};

export type LayoutType = 'row' | 'space';
