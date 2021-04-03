# antd-form-render

简单使用 javascript 对象配置，实现Antd表单开发. 已经在多个项目中使用。

## 安装

 用npm [npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:



    $ npm install --save antd-form-render
    $ yarn add antd-form-render



## 功能

* 配置一维数组实现 一行一列
* 配置二维数组实现 一行多列


### 实现一行一列

```jsx
import React, { useState } from 'react';
import FormRender from 'antd-form-render';
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

### 实现一行n列如下 ,比如一行2列 

```jsx

 const layout = [
    [
      {
        type: Input,
        label: '11',
        placeholder: '请输入',
        name: '11',
      },
      {
        type: Input,
        label: '12',
        placeholder: '请输入',
        name: '12',
      },
    ],
    [
      {
        type: Input,
        label: '21',
        placeholder: '请输入',
        name: '21',
      },
      {
        type: Input,
        label: '22',
        placeholder: '请输入',
        name: '22',
      },
    ],
  ];
```

配置项目说明
```javascript
export interface Item {
  type: React.Component; // 组件类型， 比如Input 等
  name: string;  //Form.Item的name
  rules?: any;  // Form.Item的rules
  label?: string; // Form.Item的label
  render?: () => React.ReactNode; //自定义 render 
  getJSON?: () => object | null; // 动态返回Item配置
  elProps?: object; // 组件的props配置 , 比如type为Input, elProps则会配置到Input
  itemProps?: object; // Form.Item的props配置，除了上面name,lable,rules三个常用的，其他的可以放在这里配置
}
```

 可以自己运行示例， yarn start / npm start 查看demo
