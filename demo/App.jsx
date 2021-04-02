import React, { useState, useEffect } from 'react';
import FormRender from '../src/index';
import { Form, Button, Space, Input, Radio, Select } from 'antd';
import './App.less';

export default function App() {
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const searchLayout = [
    {
      type: Input,
      label: '姓名',
      placeholder: '请输入',
      name: 'name',
      elProps: {
        maxLength: 10,
      },
    },
    {
      type: Radio.Group,
      label: '性别',
      name: 'gender',
      elProps: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
    },
    {
      getJSON() {
        return data.gender === 'male'
          ? {
              type: Input,
              label: '男孩输入兴趣爱好',
              placeholder: '请输入兴趣爱好',
              name: 'malefav',
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
      name: 'remark',
      label: '个性描述',
      elProps: {
        placeholder: '个性描述',
        rows: 6,
      },
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      type: Input,
      label: '手机号',
      placeholder: '请输入',
      name: 'phone',
    },
    {
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

  return (
    <Form
      form={form}
      className="app"
      onValuesChange={(v) => {
        setData((p) => ({ ...p, ...v }));
      }}
    >
      <FormRender layoutData={searchLayout} />
    </Form>
  );
}
