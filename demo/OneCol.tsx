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
