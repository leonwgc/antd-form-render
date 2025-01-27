import React from 'react';
import { Form, Button, Input, Flex } from 'antd';
import { GridRender } from '../src';

const GridOneColumn = () => {
  const [form] = Form.useForm();

  const oneColumn = [
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
          <Flex justify="flex-end">
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Flex>
        );
      },
    },
  ];

  return (
    <Form
      form={form}
      labelAlign="right"
      style={{ width: 400 }}
      layout="vertical"
    >
      <GridRender layout={oneColumn} />
    </Form>
  );
};

export default GridOneColumn;
