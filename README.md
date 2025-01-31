# antd-form-render

使用 js 配置，开发 ant-design 表单， [在线示例](https://leonwgc.github.io/antd-form-render/)

## 安装

用 [npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:

    $ npm install --save antd-form-render
    $ yarn add antd-form-render

## 特点

1. 基于 js 配置开发 ant design 表单项
2. 支持 Grid, Flex, Space 三种布局
3. 与 react 数据驱动视图理念保持一致`UI=F(state)`
4. 基于 react-hooks
5. 使用 typescript 编写，开发智能提示

## 示例

#### Grid 一行一列布局

![image](./imgs/grid1.png)

```tsx
import React from 'react';
import { Form, Button, Input } from 'antd';
import { GridRender } from 'antd-form-render';

const GridOneColumn = () => {
  const [form] = Form.useForm();

  const layout: Item[] = [
    {
      label: '手机号',
      name: 'tel',
      rules: [{ required: true, message: '请输入' }],
      element: <Input placeholder="请输入" maxLength={11} />,
    },
    {
      label: '密码',
      name: 'pwd',
      element: <Input.Password placeholder="请输入"></Input.Password>,
    },
    {
      element: (
        <Flex justify="flex-end">
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Form form={form} layout="vertical" style={{ width: 400 }}>
      <GridRender layout={layout} />
    </Form>
  );
};

export default GridOneColumn;
```

#### Grid 一行 1 ~ 4 列

![image](./imgs/gridN.png)

```tsx
import React, { useState } from 'react';
import { Input, Radio, Form } from 'antd';
import { GridRender } from 'antd-form-render';

const GridNColumns = () => {
  const layout: Item[] = [];
  const [cols, setCols] = useState(4);

  for (let i = 0; i < 11; i++) {
    layout.push({
      label: `输入框${i + 1}`,
      name: `name${i}`,
      element: <Input placeholder="请输入" />,
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

      <GridRender layout={layout} columnCount={cols} gutter={[8, 8]} />
    </Form>
  );
};

export default GridNColumns;
```

#### Space 布局

![image](./imgs/space.png)

```tsx
import React, { useState } from 'react';
import { Input, Radio, Form, Button } from 'antd';
import { SpaceRender } from 'antd-form-render';

const SpaceLayout = () => {
  const [form] = Form.useForm();
  const layout: Item[] = [];
  const [space, setSpace] = useState(8);

  for (let i = 0; i < 3; i++) {
    layout.push({
      name: `name${i}`,
      label: `输入框${i + 1}`,
      element: <Input placeholder="请输入" />,
    });
  }

  layout.push({
    element: (
      <Button
        type="primary"
        onClick={() => {
          console.log(form.getFieldsValue());
        }}
      >
        submit
      </Button>
    ),
  });

  return (
    <Form form={form} layout="horizontal">
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

      <SpaceRender layout={layout} size={space} />
    </Form>
  );
};

export default SpaceLayout;
```

#### Flex 布局

![image](./imgs/flex.png)

```tsx
import React, { useState } from 'react';
import { Input, Radio, Form, Button } from 'antd';
import { FlexRender, Item } from 'antd-form-render';

const FlexLayout = () => {
  const [form] = Form.useForm();
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
    element: (
      <Button
        type="primary"
        onClick={() => {
          console.log(form.getFieldsValue());
        }}
      >
        submit
      </Button>
    ),
  });

  return (
    <Form form={form} layout="horizontal">
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
```

#### 表单联动

1. 定义 form onValuesChange 同步状态到外部 state, 触发重新渲染实现表单联动（全量渲染）
2. 利用 Form.Item dependencies / shouldUpdate 和自定义 render 实现表单联动 (非全量渲染)

![image](./imgs/dep-update.png)

```tsx
import React from 'react';
import { Form, Radio, Divider } from 'antd';
import { GridRender, Item } from 'antd-form-render';

const DynamicRender = () => {
  const [form] = Form.useForm();

  const layout: Item[] = [
    {
      label: '性别',
      name: 'gender',
      element: (
        <Radio.Group
          options={[
            { label: '男', value: '男生' },
            { label: '女', value: '女生' },
          ]}
        />
      ),
    },
    {
      element: <Divider orientation="left"> element() </Divider>,
    },
    {
      element: () =>
        form.getFieldValue('gender') && (
          <div> 你的性别(element()) {form.getFieldValue('gender')}</div>
        ),
    },
    {
      element: <Divider orientation="left"> render() </Divider>,
    },
    {
      render: () =>
        form.getFieldValue('gender') && (
          <div> 你的性别(render()) {form.getFieldValue('gender')}</div>
        ),
    },
  ];

  return (
    <div>
      <Form form={form}>
        <GridRender layout={layout}></GridRender>
      </Form>
    </div>
  );
};

export default DynamicRender;
```

#### 动态增删

![image](./imgs/list.png)

```js
import React, { useState } from 'react';
import { Input, Radio, Form, Space, Button } from 'antd';
import { GridRender } from 'antd-form-render';

type FormData = {
  gender: '0' | '1',
  name: string,
  tels: string[],
};

const DynamicAdd = () => {
  const [form] = Form.useForm();

  const [data, setData] =
    useState <
    FormData >
    {
      gender: '0',
      tels: ['15901631201', '17721222222'],
      name: 'leon',
    };

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
