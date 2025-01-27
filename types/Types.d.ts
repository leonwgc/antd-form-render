import { Rule } from 'rc-field-form/lib/interface';
import type { SpaceProps, FlexProps } from 'antd';
/**
 * Render配置项
 *
 * @export
 * @interface Item
 */
export type Item = {
    /**
     * React组件类型，例如：Input、DatePicker, "input"
     */
    type?: React.ComponentType | string;
    /**
     * Form.Item name 字段
     */
    name?: string | Array<string | number>;
    /**
     * Form.Item label
     */
    label?: React.ReactNode;
    /**
     * 自定义渲染
     */
    render?: () => React.ReactNode;
    /**
     * 动态返回Item，优先级高于render
     */
    getJSON?: () => Item | null;
    /**
     * 组件props,会透传给type定义的组件
     */
    elProps?: Record<string, unknown>;
    /**
     * Form.Item的props,会透传给Form.Item
     */
    itemProps?: Record<string, unknown>;
    /**
     * Form.Itemrules,也可在itemProps里定义
     */
    rules?: Rule[];
};
export type GridRenderProps = {
    /**
     * 布局配置
     */
    layout: Item[];
    /**
     * GridRender 一行的列数, 可以是: 1 | 2 | 3 | 4, 默认1,
     */
    columnCount?: number;
};
export type SpaceRenderProps = SpaceProps & {
    /**
     * 1维数组，存储组件配置信息/自定义渲染组件
     */
    layout: Item[];
};
export type FlexRenderProps = FlexProps & {
    layout: Item[];
};
export type layoutType = 'grid' | 'space' | 'flex';
