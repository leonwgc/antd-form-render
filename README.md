# antd-form-render

使用 js 配置，开发 ant-design 表单

## 安装

用 [npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:

    $ npm install --save antd-form-render
    $ yarn add antd-form-render

## 特点

1. 基于 js 配置开发ant design 表单项目
2. 支持Grid, Flex, Space 三种布局
3. 支持表单联动
4. 支持全量渲染 / 局部渲染
5. 支持动态增 / 删 / 改表单项目
6. 与react数据驱动视图理念保持一致`UI=F(state)`
7. 基于react-hooks
8. 使用 typescript 编写，开发智能提示

## 示例

####  Grid 一行一列布局


![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/fdad9492d7f94fb28634bbae2111d0dc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbGVvbndnYw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzY0OTE1ODIyOTAzMDQ4In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1738038989&x-orig-sign=uYe7qNnrGG4xiEx1xu3mcjhVEgw%3D)

```tsx
import React from 'react';
import { Form, Button, Input } from 'antd';
import { GridRender } from 'antd-form-render';

const GridOneColumn = () => {
  const [form] = Form.useForm();

  const oneColumn = [
    {
      type: Input,
      label: '手机号',
      placeholder: '请输入',
      name: 'tel',
      elProps: {
        maxLength: 11,
      },
      itemProps: {
        rules: [
          { required: true, message: '请输入' },
          { pattern: /^1\d{10}$/, message: '手机号必须为11位数字' },
        ],
      },
    },
    {
      type: Input.Password,
      label: '密码',
      placeholder: '请输入',
      name: 'pwd',
      itemProps: {
        rules: [{ required: true, message: '请输入' }],
      },
    },
    {
      render() {
        return (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" htmlType="submit" style={{ width: 120 }}>
              登录
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Form form={form} labelCol={{ span: 4 }} labelAlign="left">
      <GridRender layout={oneColumn} />
    </Form>
  );
};

export default GridOneColumn;

```

#### Grid 一行1 ~ 4列

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a84f62d5624f469a9b14b72aba383f9c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbGVvbndnYw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzY0OTE1ODIyOTAzMDQ4In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1738039192&x-orig-sign=sY6yY4nuwsAlz27b5zrH7bs%2BT%2B0%3D)

```tsx
import React, { useState } from 'react';
import { Input, Radio, Form } from 'antd';
import { GridRender } from 'antd-form-render';

const GridNColumns = () => {
  const layout: Item[] = [];
  const [cols, setCols] = useState(4);

  for (let i = 0; i < 11; i++) {
    layout.push({
      type: Input,
      label: `输入框${i + 1}`,
      name: `name${i}`,
      elProps: {
        placeholder: '请输入',
      },
    });
  }

  return (
    <Form layout="vertical">
      <div style={{ marginBottom: 24 }}>
        <Radio.Group
          onChange={(e) => setCols(Number(e.target.value))}
          optionType="button"
          value={cols}
        >
          <Radio value={1}>1行1列</Radio>
          <Radio value={2}>1行2列</Radio>
          <Radio value={3}>1行3列</Radio>
          <Radio value={4}>1行4列</Radio>
        </Radio.Group>
      </div>
      <GridRender
        layout={layout}
        columnCount={cols}
        gutter={[8, 8]}
      ></GridRender>
    </Form>
  );
};

export default GridNColumns;

```

#### Space 布局

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b12ed1ce19b14edcb9bcd4d4f1a51ee0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbGVvbndnYw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzY0OTE1ODIyOTAzMDQ4In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1738039266&x-orig-sign=bGZxCewNUX9UlOnXVx98FjBUqmU%3D)

```tsx
import React, { useState } from 'react';
import { Input, Radio, Form, Button } from 'antd';
import { SpaceRender } from 'antd-form-render';

const SpaceLayout = () => {
  const layout: Item[] = [];
  const [space, setSpace] = useState(8);

  for (let i = 0; i < 3; i++) {
    layout.push({
      name: `name${i}`,
      type: Input,
      label: `输入框${i + 1}`,
      elProps: {
        placeholder: '请输入',
      },
    });
  }

  layout.push({
    render: () => <Button type="primary">submit</Button>,
  });

  return (
    <Form layout="horizontal">
      <div style={{ marginBottom: 24 }}>
        <Radio.Group
          onChange={(e) => setSpace(Number(e.target.value))}
          optionType="button"
          value={space}
        >
          <Radio value={8}>8px</Radio>
          <Radio value={16}>16px</Radio>
          <Radio value={24}>24px</Radio>
          <Radio value={32}>32px</Radio>
        </Radio.Group>
      </div>
      <SpaceRender layout={layout} size={space}></SpaceRender>
    </Form>
  );
};

export default SpaceLayout;

```

#### Flex 布局

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9fc22216c04c4e5793cb68c9081f1e4d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbGVvbndnYw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzY0OTE1ODIyOTAzMDQ4In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1738039442&x-orig-sign=yFfkmg6lIFcZnAyOj3wPgAAaTZM%3D)

```tsx
import React, { useState } from 'react';
import { Input, Radio, Form, Button } from 'antd';
import { FlexRender, Item } from 'antd-form-render';

const FlexLayout = () => {
  const layout: Item[] = [];
  const [gap, setGap] = useState(8);

  for (let i = 0; i < 3; i++) {
    layout.push({
      name: `name${i}`,
      type: Input,
      label: `输入框${i + 1}`,
      elProps: {
        placeholder: '请输入',
      },
    });
  }

  layout.push({
    render: () => <Button type="primary">submit</Button>,
  });

  return (
    <Form layout="horizontal">
      <div style={{ marginBottom: 24 }}>
        <Radio.Group
          onChange={(e) => setGap(Number(e.target.value))}
          optionType="button"
          value={gap}
        >
          <Radio value={8}>8px</Radio>
          <Radio value={16}>16px</Radio>
          <Radio value={24}>24px</Radio>
          <Radio value={32}>32px</Radio>
        </Radio.Group>
      </div>
      <FlexRender layout={layout} gap={gap} justify="flex-end" />
    </Form>
  );
};

export default FlexLayout;

```

#### 表单联动

1. 定义 form onValuesChange 同步状态到外部 state, 触发重新渲染实现表单联动（全量渲染）
2. 利用 Form.Item dependencies / shouldUpdate 和自定义 render 实现表单联动 (非全量渲染)


![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f9d024002ba4425c9ce0fa5cb33c68e9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbGVvbndnYw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzY0OTE1ODIyOTAzMDQ4In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1738039577&x-orig-sign=75EHHztqlbfEvEf2Ktn6qeoNcA8%3D)

```tsx
import React, { useState } from 'react';
import { Form, Radio } from 'antd';
import { GridRender } from 'antd-form-render';

const DynamicRender = () => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  //#region 全量渲染联动

  // 用于同步表单状态
  const [data, setData] = useState<{ gender?: string }>({});

  const layout = [
    {
      type: Radio.Group,
      label: '性别',
      name: 'gender',
      elProps: {
        options: [
          { label: '男', value: '男生' },
          { label: '女', value: '女生' },
        ],
      },
    },
    {
      type: 'div',
      label: '你是',
      elProps: {
        children: data?.gender || '未选择',
      },
    },
  ];

  //#endregion 全量渲染联动

  //#region 局部联动渲染

  // 基于Form.Item dependency/shouldUpdate 实现表单联动,局部渲染
  const layout1 = [
    {
      type: Radio.Group,
      label: '性别',
      name: 'gender',
      elProps: {
        options: [
          { label: '男', value: '男生' },
          { label: '女', value: '女生' },
        ],
      },
    },
    {
      render() {
        // dependencies
        return (
          <Form.Item label="你是" dependencies={['gender']}>
            {() => {
              const gender = form1.getFieldValue('gender');
              return gender || '未选择';
            }}
          </Form.Item>
        );
      },
    },
    {
      render() {
        // shouldUpdate
        return (
          <Form.Item shouldUpdate label="你是">
            {() => {
              return form1.getFieldValue('gender');
            }}
          </Form.Item>
        );
      },
    },
  ];

  //#endregion 局部联动渲染

  return (
    <div>
      <p>1.定义onValuesChange 同步状态到state , 触发全量渲染实现表单联动</p>

      <Form
        form={form}
        onValuesChange={(v) => {
          setData((p) => ({ ...p, ...v }));
        }}
      >
        <GridRender layout={layout}></GridRender>
      </Form>

      <p>2.基于Form.Item dependency/shouldUpdate 实现表单联动,局部渲染</p>

      <Form form={form1}>
        <GridRender layout={layout1}></GridRender>
      </Form>
    </div>
  );
};

export default DynamicRender;

```

#### 动态增删

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/152a4daae13d4789877d0e2e0f5886e4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbGVvbndnYw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzY0OTE1ODIyOTAzMDQ4In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1738039742&x-orig-sign=03Ezr3H6MMpYMHJSliJpsv3gU7M%3D)

```js
import React, { useState } from 'react';
import { Input, Radio, Form, Space, Button } from 'antd';
import { GridRender } from 'antd-form-render';

type FormData = {
  gender: '0' | '1';
  name: string;
  tels: string[];
};

const DynamicAdd = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState<FormData>({
    gender: '0',
    tels: ['15901631201', '17721222222'],
    name: 'leon',
  });

  const [tels, setTels] = useState([...data.tels]); // telephone list

  const telsLayout = tels?.map((item, index) => ({
    render() {
      return (
        <Space align="start" style={{ width: '100%' }}>
          <Form.Item
            name={['tels', index]}
            rules={[
              {
                pattern: /^1\d{10}$/,
                message: '请输入正确的手机号码',
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              maxLength={11}
              placeholder="请输手机号"
              style={{ width: 350 }}
            />
          </Form.Item>
          {tels.length > 1 && (
            <Button
              type="link"
              onClick={() => {
                const tels = form.getFieldValue('tels');
                tels.splice(index, 1);
                form.setFieldsValue({ tels: [...tels] });
                setTels([...tels]);
              }}
            >
              删除
            </Button>
          )}
        </Space>
      );
    },
  }));

  const layout = [
    {
      type: Input,
      label: '姓名',
      name: 'name',
      rules: [{ required: true, message: '请填写' }],
      elProps: {
        placeholder: '请填写姓名',
      },
    },
    {
      render() {
        return <div style={{ margin: '12px 0' }}>手机号</div>;
      },
    },

    ...telsLayout,
    {
      render() {
        return (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => {
                const tels = form.getFieldValue('tels') || [''];
                const newTels = [...tels, ''];
                form.setFieldsValue({ tels: newTels });
                setTels(newTels);
              }}
            >
              + 手机号
            </Button>
          </div>
        );
      },
    },
    {
      type: Radio.Group,
      label: '性别',
      name: 'gender',
      elProps: {
        options: [
          { label: '女', value: '0' },
          { label: '男', value: '1' },
        ],
      },
    },
    {
      getJSON() {
        return data.gender !== undefined
          ? {
              label: '性别',
              type: 'div',
              children: data.gender == '1' ? '男' : '女',
            }
          : null;
      },
    },

    {
      render() {
        return (
          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button type="default" onClick={() => form.resetFields()}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Form
        form={form}
        style={{ width: 400 }}
        layout={'vertical'}
        initialValues={data}
        onFinish={(values) => {
          console.log(values);
        }}
        onValuesChange={(c, a) => {
          setData(a);
        }}
      >
        <GridRender layout={layout}></GridRender>
      </Form>
    </div>
  );
};

export default DynamicAdd;

```

### 组件类型定义

```ts
import { Rule } from 'rc-field-form/lib/interface';
import type { SpaceProps, FlexProps, RowProps } from 'antd';
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
export type GridRenderProps = RowProps & {
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
export type FlexRenderProps = Partial<FlexProps> & {
    layout: Item[];
};
export type layoutType = 'grid' | 'space' | 'flex';


/**
 * Grid布局
 *
 * @param {GridRenderProps} props - The properties for the GridRender component.
 * @param {Item[]} props.layout - The layout data, an array of items to be rendered in the grid.
 * @param {number} [props.columnCount=1] - The number of columns in the grid.
 * @param {object} ..rest - Additional properties to be passed to the inner Row component.
 * @returns {React.ReactElement} The rendered grid layout.
 */
declare const GridRender: React.FC<GridRenderProps>;

/**
 * Flex布局
 *
 * @param {FlexRenderProps} props - The properties for the FlexRender component.
 * @param {Item[]} props.layout - The layout data, an array of items to be rendered in the flex layout.
 * @param {FlexProps} [props.flexProps] - Additional properties to be passed to the inner Flex component.
 * @returns {React.ReactElement} The rendered flex layout.
 */
declare const FlexRender: React.FC<FlexRenderProps>;

/**
 * Space 布局
 *
 * @param {SpaceRenderProps} props - The properties for the SpaceRender component.
 * @param {Item[]} props.layout - The layout data, an array of items to be rendered in the space.
 * @returns {React.ReactElement} The rendered space layout.
 */
declare const SpaceRender: React.FC<SpaceRenderProps>;


```


