# antd-form-render

使用js配置，开发antd v4表单

## 安装

用 npm [npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:

    $ npm install --save antd-form-render
    $ yarn add antd-form-render

## 功能

1. 通过js配置开发 antd v4表单
2. 等宽度布局，实现1行1列，1行2列，1行3列，1行4列 (基于Row与Col排列)
3. 等间距布局 (基于Space排列)



### 1. 一行一列


![demo1.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/846740cc9ee5404c8a319002809f467c~tplv-k3u1fbpfcp-watermark.image)

```js
import React from 'react';
import styled from 'styled-components';
import { Form, Button, Space, Input, message } from 'antd';
import FormRender from 'antd-form-render';

const StyledOneRow = styled.div`
  width: 400px;
`;

const OneCol = () => {
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
      type: Input.Password,
      label: '确认密码',
      placeholder: '请输入',
      name: 'confirmPwd',
      itemProps: {
        rules: [
          { required: true, message: '请输入' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('pwd') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不一致'));
            },
          }),
        ],
      },
    },
    {
      type: Input.TextArea,
      name: 'desc',
      label: '简介',
      elProps: {
        placeholder: '个人简介',
        rows: 4,
      },
    },
    {
      // 自定义render
      render() {
        return (
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Space>
              <Button htmlType="submit" type="primary">
                确定
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        );
      },
    },
  ];

  return (
    <StyledOneRow>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        onFinish={(v) => {
          message.success(JSON.stringify(v));
        }}
      >
        <FormRender layoutData={oneRowLayout}></FormRender>
      </Form>
    </StyledOneRow>
  );
};

export default OneCol;

```

### 2. 一行多列布局


![demo2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b2b039808964cd28f9a7baf70ae21a5~tplv-k3u1fbpfcp-watermark.image)

```js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Radio, Form } from 'antd';
import FormRender from 'antd-form-render';

const StyledOneRow = styled.div`
  width: 800px;
`;

const MultipleCols = () => {
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
    <StyledOneRow>
      <Form layout="vertical">
        <div style={{ margin: '16px 0' }}>
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
    </StyledOneRow>
  );
};

export default MultipleCols;

```

### 3. 等间距排列 (常用于列表页面的搜索等)

![demo3.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45f46855cad44c968f5bde33999cb0b2~tplv-k3u1fbpfcp-watermark.image)


```js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Radio, Form } from 'antd';
import { FormSpaceRender } from 'antd-form-render';

const StyledOneRow = styled.div`
  width: 1000px;
`;

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
    <StyledOneRow>
      <Form layout="horizontal">
        <div style={{ margin: '16px 0' }}>
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
    </StyledOneRow>
  );
};

export default SpaceLayout;

```

### 4.表单联动

![demo4.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb820b0216ca42d597f7898e404bb465~tplv-k3u1fbpfcp-watermark.image)


```js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button, Radio, message } from 'antd';
import FormRender from 'antd-form-render';

const StyledOneRow = styled.div`
  width: 600px;
`;

const StyledP = styled.p`
  padding: 10px;
`;

const OneColWithDynamicControl = () => {
  const [form] = Form.useForm();

  const [form1] = Form.useForm();

  // 用于同步表单状态
  const [data, setData] = useState({});

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
        children: data.gender || '未选择'
      },
    },
    {
      type: Button,
      elProps: {
        htmlType: 'submit',
        type: 'primary',
        children: '确定',
      },
      itemProps: {
        wrapperCol: { offset: 6 },
      },
    },
  ];

  // 基于antd dependency 实现表单联动
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
      type: Button,
      elProps: {
        htmlType: 'submit',
        type: 'primary',
        children: '确定',
      },
      itemProps: {
        wrapperCol: { offset: 6 },
      },
    },
  ];

  return (
    <StyledOneRow>
      <StyledP>1.定义onValuesChange 同步状态到state , 触发重新渲染实现表单联动</StyledP>
      <Form
        form={form}
        onValuesChange={(v) => {
          setData((p) => ({ ...p, ...v }));
        }}
        labelCol={{ span: 6 }}
        onFinish={(v) => {
          message.success(JSON.stringify(v));
        }}
      >
        <FormRender layoutData={layout}></FormRender>
      </Form>

      <StyledP>2.利用Form.Item dependencies/shouldUpdate 和自定义render 实现表单联动</StyledP>
      <Form
        form={form1}
        labelCol={{ span: 6 }}
        onFinish={(v) => {
          message.success(JSON.stringify(v));
        }}
      >
        <FormRender layoutData={layout1}></FormRender>
      </Form>
    </StyledOneRow>
  );
};

export default OneColWithDynamicControl;

```

### 组件类型定义

```javascript
export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: SpaceSize | [SpaceSize, SpaceSize];
    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'end' | 'center' | 'baseline';
    split?: React.ReactNode;
    wrap?: boolean;
}

// 1行n列布局组件
export declare type FormRenderProps = {
  layoutData: Item[] | Item[][];
  cols?: null | 1 | 2 | 3 | 4;
};

// 等间距布局组件
export declare type SpaceLayoutProps = SpaceProps & {
  layoutData: Item[];
};

export declare type Item = {
  type?: React.ComponentType | string; // 组件，比如Input,Button 
  name?: string; // 名称，传给Form.Item的name ，作为form data的key
  label?: string; // label名称
  render?: () => React.ReactNode; // 自定义render
  getJSON?: () => Item | null; // 动态返回Item 
  elProps?: Record<string | number | symbol, unknown>; // 组件的props， 比如Button,Input 的props , 参考antd文档配置
  itemProps?: Record<string | number | symbol, unknown>; // Form.Item的props, 参考antd文档配置
  rules?: Rule[]; // Form.Item的rules,在itemProps里面定义也可 
};

```

