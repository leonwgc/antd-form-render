## 基于 react hooks 和 antd4.x 的表单配置方案

用法参考注释

```javascript
import React, { useState, useEffect } from 'react';
import FormRender from '../src/index';
import { Form, Button, Space, Input, Radio, Select, InputNumber } from 'antd';
import './App.less';

export default function App() {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [data, setData] = useState({});

  // 如果是一维数组，则从上往下一行放一个 item
  const layout = [
    {
      type: Input,
      label: '姓名',
      placeholder: '请输入',
      name: 'name',
      // 对Input的配置 , elProps对type指定的组件配置
      elProps: {
        maxLength: 10,
      },
    },
    {
      type: Radio.Group,
      label: '性别',
      name: 'gender',
      // 对Radio.Group的配置
      elProps: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
      // 对Form.Item的配置
      itemProps: {
        help: '下面的组件根据选择动态渲染',
      },
    },
    {
      // 根据条件动态返回object
      getJSON() {
        return data.gender === 'male'
          ? {
              type: Input,
              label: '男孩输入兴趣爱好',
              placeholder: '请输入兴趣爱好',
              name: 'malefav',
              // 对Form.Item的配置
              itemProps: {
                rules: [{ required: true, message: '请输入男孩输入兴趣爱好' }],
              },
            }
          : data.gender === 'female'
          ? {
              type: Select,
              label: '女孩选择兴趣爱好',
              placeholder: '请选择兴趣爱好',
              name: 'femalefav',
              // 对Form.Item的配置
              itemProps: {
                itemProps: {
                  rules: [{ required: true, message: '请选择兴趣爱好' }],
                },
              },
              // 对Select的配置
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
      name: 'remark',
      label: '个性描述',
      // 对Input.TextArea的配置
      elProps: {
        placeholder: '个性描述',
        rows: 6,
      },
      // 对Form.Item的配置
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
          <Form.Item label="自定义render">
            <Form.Item name="amount" rules={[{ required: true, message: '请输入' }]} noStyle>
              <InputNumber min={1} placeholder="请输入" />
            </Form.Item>
            <span className="unit">元</span>
            <span className="remind">大于1的正整数</span>
          </Form.Item>
        );
      },
    },
    {
      // 自定义render
      render() {
        return (
          <div className="search-part">
            <Space>
              <Button htmlType="submit" type="primary">
                搜索
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
            <div>{JSON.stringify(data)}</div>
          </div>
        );
      },
    },
  ];

  // 如果是二维数组，则每个子数组元素的数量，则为一行显示的item数量 ,子数组长度被24整除
  const layout1 = [
    [
      {
        type: Input,
        label: '姓名1',
        placeholder: '请输入',
        name: 'name1',
        // 对Input的配置 , elProps对type指定的组件配置
        elProps: {
          maxLength: 10,
        },
      },
      {
        type: Input,
        label: '姓名2',
        placeholder: '请输入',
        name: 'name2',
        // 对Input的配置 , elProps对type指定的组件配置
        elProps: {
          maxLength: 10,
        },
      },
    ],
    [
      {
        type: Input,
        label: '姓名3',
        placeholder: '请输入',
        name: 'name3',
        // 对Input的配置 , elProps对type指定的组件配置
        elProps: {
          maxLength: 10,
        },
      },
      {
        type: Input,
        label: '姓名4',
        placeholder: '请输入',
        name: 'name4',
        // 对Input的配置 , elProps对type指定的组件配置
        elProps: {
          maxLength: 10,
        },
      },
    ],
  ];

  return (
    <div>
      <Form
        form={form}
        className="app"
        layout="vertical"
        onValuesChange={(v) => {
          setData((p) => ({ ...p, ...v }));
        }}
      >
        <h2>一行一列 (配置一维数组)</h2>
        <FormRender layoutData={layout} />
      </Form>
      <Form form={form2} className="app" layout="vertical">
        <h2>一行多列 (配置二维数组)</h2>
        <FormRender layoutData={layout1}></FormRender>
      </Form>
    </div>
  );
}
```

效果如下

![demo](https://static.zuifuli.com/images/git-demo.png)
