import React, { useState } from 'react';
import { Input, Radio, Form, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import FormRender from 'antd-form-render';

const DynamicForm = () => {
  const [form] = Form.useForm();
  const [jobExps, setJobExps] = useState([
    {
      id: 0,
      title: '蓝翔技校挖掘机老师',
    },
    {
      id: 1,
      title: '北大青鸟厨师',
    },
    {
      id: 2,
      title: '清华扫地僧',
    },
  ]);

  const jobExpLayout = jobExps?.map((ex, index) => ({
    name: ['jobs', index],
    type: Input,
    label: '工作经历' + (index + 1),
    key: ex.id,
    elProps: {
      placeholder: '请填写',
      addonAfter: jobExps.length > 1 && (
        <MinusCircleOutlined
          onClick={() => {
            const jobs = form.getFieldValue('jobs');
            jobs.splice(index, 1);
            setJobExps(
              jobs.map((e, i) => ({
                id: jobExps[i].id,
                title: e,
              }))
            );
          }}
        />
      ),
    },
    itemProps: {
      initialValue: ex.title,
    },
    rules: [{ required: true }],
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
    // 动态更新组件
    ...jobExpLayout,
    {
      render() {
        return (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={() => {
                setJobExps([...jobExps, { id: +Date.now(), title: '' }]);
              }}
            >
              添加工作经历
            </Button>
          </div>
        );
      },
    },
    {
      type: Input.TextArea,
      label: '个人简',
      elProps: {
        rows: 6,
      },
      placeholder: '请输入',
      name: 'bio',
    },

    ,
    {
      render() {
        return (
          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button type="default">取消</Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ width: 600 }}>
      <Form onFinish={console.log} form={form}>
        <FormRender layoutData={layout}></FormRender>
      </Form>
    </div>
  );
};

export default DynamicForm;
