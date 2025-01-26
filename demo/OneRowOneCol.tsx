import React from 'react';
import { Form, Button, Input } from 'antd';
import { FormRender } from 'antd-form-render';

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
