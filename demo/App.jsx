import React, { useState } from 'react';
import FormRender from '../src';
import { Form, Button, Space, Input, Radio, Select, message } from 'antd';
import './App.less';

const { Option } = Select;

export default function App() {
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const [cols, setCols] = useState(4);

  // 如果是一维数组，则从上往下一行放一个 item (未设置cols)
  const layout = [
    {
      type: Input,
      label: '手机号',
      placeholder: '请输入',
      name: 'tel',
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

  // 如果是二维数组，则每个子数组元素的数量，则为一行显示的item数量 ,子数组长度被24整除
  const layout1 = [
    [
      {
        type: Input,
        label: '姓名1',
        placeholder: '请输入',
        name: 'name1',
        elProps: {
          maxLength: 10,
        },
      },
      {
        type: Input,
        label: '姓名2',
        placeholder: '请输入',
        name: 'name2',
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
        elProps: {
          maxLength: 10,
        },
      },
      {
        type: Input,
        label: '姓名4',
        placeholder: '请输入',
        elProps: {
          maxLength: 10,
        },
      },
    ],
  ];

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

  return (
    <div className="app">
      <section>
        <Form
          form={form}
          className="form"
          layout="horizontal"
          onValuesChange={(v) => {
            setData((p) => ({ ...p, ...v }));
          }}
          onFinish={(v) => {
            message.success(JSON.stringify(v));
          }}
        >
          <h2>一行一列 (配置一维数组)</h2>
          <FormRender layoutData={layout} />
        </Form>
        <Form className="form1" layout="vertical">
          <h2>一行多列 (配置二维数组)</h2>
          <FormRender layoutData={layout1}></FormRender>
        </Form>
      </section>
      <section>
        <Form className="form2" layout="vertical">
          <h2>一行多列 (配置一维数组和cols)</h2>
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
          <FormRender layoutData={layout3} cols={cols}></FormRender>
        </Form>
      </section>
    </div>
  );
}
