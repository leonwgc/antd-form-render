# antd-form-render

使用js对象配置，开发antd v4表单

## 安装

用 npm [npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:

    $ npm install --save antd-form-render
    $ yarn add antd-form-render

## 特点
1. 基于javascript对象配置, 简单, 灵活，高效，上手快，开发快
2. 简单实现各类表单布局，一行一列，一行2/3/4列, 一行不定列，等间距排列，没有做不到，只有想不到
3. 实现表单项联动，全量渲染，局部渲染，so easy

## 示例

### 1. 一行一列


![1.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cff5cac07014d74aec5eb75acef50d6~tplv-k3u1fbpfcp-watermark.image?)


```js
import React from 'react';
import { Form, Button, Input } from 'antd';
import FormRender from 'antd-form-render';

const OneRowOneCol = () => {
  const [form] = Form.useForm();

  const oneRowLayout = [
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
    <div style={{ width: 400, paddingTop: 32 }}>
      <Form form={form} labelCol={{ span: 4 }} labelAlign="left">
        <FormRender layoutData={oneRowLayout}></FormRender>
      </Form>
    </div>
  );
};

export default OneRowOneCol;
```

### 2. 一行N列

![2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de8307358c98474f865e4b633aa71030~tplv-k3u1fbpfcp-watermark.image?)


```js
import React, { useState } from 'react';
import { Input, Radio, Form } from 'antd';
import FormRender from 'antd-form-render';

const OneRowNCol = () => {
  const layout = [];
  const [cols, setCols] = useState(4);

  for (let i = 0; i < 11; i++) {
    layout.push({
      type: Input,
      label: `输入框${i + 1}`,
      placeholder: '请输入',
      name: `name${i}`,
    });
  }

  return (
    <div style={{ paddingTop: 32, width: 800 }}>
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
        <FormRender layoutData={layout} cols={cols}></FormRender>
      </Form>
    </div>
  );
};

export default OneRowNCol;
```

### 3. 等间距排列


![3.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fd4ffd55f7846a68e9184e7acbddae7~tplv-k3u1fbpfcp-watermark.image?)

```js
import React, { useState } from 'react';
import { Input, Radio, Form } from 'antd';
import { FormSpaceRender } from 'antd-form-render';

const SpaceLayout = () => {
  const layout = [];
  const [space, setSpace] = useState(8);

  for (let i = 0; i < 3; i++) {
    layout.push({
      type: Input,
      label: `输入框${i + 1}`,
      placeholder: '请输入',
      name: `name${i}`,
    });
  }

  return (
    <div style={{ paddingTop: 32, width: 800 }}>
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
        <FormSpaceRender layoutData={layout} size={space}></FormSpaceRender>
      </Form>
    </div>
  );
};

export default SpaceLayout;
```

### 4.二维数组自定义布局

![4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f406c4f5815c466eb16f6a1fbe641326~tplv-k3u1fbpfcp-watermark.image?)

```js
import React from 'react';
import { Input, Radio, Form, Space, Button } from 'antd';
import FormRender from 'antd-form-render';

const TwoDimensionArray = () => {
  const layout = [
    [
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
        type: Radio.Group,
        label: '性别',
        name: 'gender',
        rules: [{ required: true, message: '请选择' }],
        elProps: {
          options: [
            { label: '女', value: 0 },
            { label: '男', value: 1 },
          ],
        },
      },
    ],
    [
      {
        type: Input.TextArea,
        label: '个人简',
        elProps: {
          rows: 6,
        },
        placeholder: '请输入',
        name: 'bio',
      },
    ],
    [
      {
        render() {
          return (
            <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
              <Button type="default">取消</Button>
              <Button type="primary">保存</Button>
            </Space>
          );
        },
      },
    ],
  ];

  return (
    <div style={{ width: 600 }}>
      <Form>
        <FormRender layoutData={layout}></FormRender>
      </Form>
    </div>
  );
};

export default TwoDimensionArray;

```

### 5.表单联动
1. 定义form onValuesChange 同步状态到外部state, 触发重新渲染实现表单联动（全量渲染）
2. 利用Form.Item dependencies/shouldUpdate和自定义render实现表单联动 (非全量渲染)


![5.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77a3961d95f74b87b44acc9348810a89~tplv-k3u1fbpfcp-watermark.image?)


```js
import React, { useState } from 'react';
import { Form, Radio } from 'antd';
import FormRender from 'antd-form-render';

const OneColWithDynamicControl = () => {
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
        <FormRender layoutData={layout}></FormRender>
      </Form>

      <p>2.基于Form.Item dependency/shouldUpdate 实现表单联动,局部渲染</p>

      <Form form={form1}>
        <FormRender layoutData={layout1}></FormRender>
      </Form>
    </div>
  );
};

export default OneColWithDynamicControl;

```

### 组件类型定义

```js
export declare type FormRenderProps = {
    /**
     * 一维数组:从上往下一行放一个表单项 ,如果设置了cols=2/3/4 ,则一行放置cols(2/3/4)个表单项
     * 二维数组:子数组配置的表单项目会被渲染为一行
     */
    layoutData: Item[] | Item[][];
    cols?: 1 | 2 | 3 | 4;
};

// 等间距布局组件
import type { SpaceProps } from 'antd';
export declare type SpaceLayoutProps = SpaceProps & {
  layoutData: Item[];
};

export declare type Item = {
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
```

