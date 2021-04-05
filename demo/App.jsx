import React, { useState, useEffect } from 'react';
import FormRender from '../lib/index';
import { Form, Button, Space, Input, Radio, Select, InputNumber } from 'antd';
import './App.less';

const { Option } = Select;

export default function App() {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [data, setData] = useState({});
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      span: 16,
      offset: 6,
    },
  };

  var a = 1;

  // 如果是一维数组，则从上往下一行放一个 item
  const layout = [
    {
      type: Input,
      label: '手机号',
      placeholder: '请输入',
      name: 'tel',
      // 对Input的配置 , elProps对type指定的组件配置
      elProps: {
        maxLength: 11,
        addonBefore: (
          <Form.Item name="prefix" noStyle initialValue="86">
            <Select
              style={{
                width: 70,
              }}
            >
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>
          </Form.Item>
        ),
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
          <Form.Item {...tailFormItemLayout}>
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
    <div className="app">
      <Form
        form={form}
        className="form"
        layout="horizontal"
        {...formItemLayout}
        onValuesChange={(v) => {
          setData((p) => ({ ...p, ...v }));
        }}
      >
        <h2>一行一列 (配置一维数组)</h2>
        <FormRender layoutData={layout} />
      </Form>
      <Form form={form2} className="form1" layout="vertical">
        <h2>一行多列 (配置二维数组)</h2>
        <FormRender layoutData={layout1}></FormRender>
      </Form>
    </div>
  );
}
