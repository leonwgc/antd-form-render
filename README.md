# antd-form-render

使用js配置，开发antd v4表单

## 安装

用 npm [npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:

    $ npm install --save antd-form-render
    $ yarn add antd-form-render

## 功能

1. 通过配置实现antd v4表单布局
2. 实现1行1列，1行2列，1行3列，1行4列自动布局，其中每列等分宽度 (基于antd Row与Col)
3. 实现等间距布局 (基于antd Space)

### 示例

1. 1行1列布局

```jsx
import React, { useState } from 'react';
import FormRender, { FormSpaceRender } from 'antd-form-render';
import { Form, Button, Space, Input, Radio, Select } from 'antd';

export default function App() {
  const [data, setData] = useState({});

  // 定义form
  const [form] = Form.useForm();

  // 一维数组定义layout，从上往下一行放一个表单控件
  const layout = [
    {
      type: Input,
      label: '手机号',
      placeholder: '请输入',
      name: 'tel',
      // 对Input的配置 , elProps对type指定的组件配置
      elProps: {
        maxLength: 11,
      },
      // 对Form.Item的配置
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
      type: Radio.Group,
      label: '性别',
      name: 'gender',
      elProps: {
        options: [
          { label: '男', value: '男' },
          { label: '女', value: '女' },
        ],
      },
    },
    {
      // 根据条件动态返回object
      getJSON() {
        return data.gender === '男'
          ? {
              type: Input,
              label: '兴趣爱好(男)',
              placeholder: '请输入兴趣爱好',
              name: 'hobby',
              itemProps: {
                rules: [{ required: true, message: '请输入兴趣爱好' }],
              },
            }
          : data.gender === '女'
          ? {
              type: Select,
              label: '兴趣爱好(女)',
              placeholder: '请选择兴趣爱好',
              name: 'hobby',
              itemProps: {
                itemProps: {
                  rules: [{ required: true, message: '请选择兴趣爱好' }],
                },
              },
              elProps: {
                options: [
                  { label: '画画', value: '画画' },
                  { label: '唱歌', value: '唱歌' },
                  { label: '跳舞', value: '跳舞' },
                ],
              },
            }
          : null;
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
      itemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      // 自定义render
      render() {
        return (
          <Form.Item>
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
    <Form
      form={form}
      onValuesChange={(v) => {
        setData((p) => ({ ...p, ...v }));
      }}
    >
      <FormRender layoutData={layout} />
    </Form>
  );
}
```

![col1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35d1514490734a5492e99a6599a10ff8~tplv-k3u1fbpfcp-watermark.image)


2. 1行n列布局

```javascript
// 一维数组,设置了cols 为1/2/3/4 ,实现自动从左至右，从上到下的 1*cols 1行多列自动布局

const layout3 = [];

for (let i = 0; i < 11; i++) {
  layout3.push({
    type: Input,
    label: `输入框${i + 1}`,
    placeholder: '请输入',
    name: `name${i}`,
  });
}

<FormRender layoutData={layout3} cols={cols}></FormRender>;
```

![coln.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d373ba70460540d7ae224275c757cb41~tplv-k3u1fbpfcp-watermark.image)

3. 等间距布局 
```javascript
 const spaceLayout = [
    {
      type: Input,
      label: '',
      placeholder: '搜索姓名/订单编号/员工ID',
      name: 'name',
      itemProps: {},
      elProps: {
        style: { width: 316 },
      },
    },
    {
      render() {
        return (
          <Space size={8} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Form.Item name="from">
              <DatePicker format="YYYY-MM-DD" style={{ width: 131 }} />
            </Form.Item>
            <span style={{ position: 'relative', top: 5 }}>至</span>
            <Form.Item name="to">
              <DatePicker format="YYYY-MM-DD" style={{ width: 131 }} />
            </Form.Item>
          </Space>
        );
      },
    },
    {
      type: Button,
      elProps: {
        type: 'primary',
        htmlType: 'submit',
        children: '查询',
        style: { width: 80 },
      },
    },
  ];
```


![space.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/201ef649a38742a78cc3d8de14e37822~tplv-k3u1fbpfcp-watermark.image)

组件定义

```javascript
// 1行n列布局组件
export declare type FormRenderProps = {
  layoutData: Item[] | Item[][];
  cols?: null | 1 | 2 | 3 | 4;
};

// 等间距布局组件
export declare type SpaceLayoutProps = {
  layoutData: Item[];
  ...props: SpaceProps // Space组件props透传
};

export declare type Item = {
  type?: React.ComponentType | string; // 组件，比如Input,Button 
  name?: string; // 名称，传给Form.Item的name ，作为form data的key
  label?: string; // label名称
  render?: () => React.ReactElement; // 自定义render
  getJSON?: () => Item | null; // 动态返回Item 
  elProps?: Record<string | number | symbol, unknown>; // 组件的props， 比如Button,Input 的props , 参考antd文档配置
  itemProps?: Record<string | number | symbol, unknown>; // Form.Item的props, 参考antd文档配置
  rules?: Rule[]; // Form.Item的rules,在itemProps里面定义也可 
};

```

