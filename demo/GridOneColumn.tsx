import React from 'react';
import { Form, Button, Input, Flex } from 'antd';
import { GridRender, Item } from '../src';

const GridOneColumn = () => {
  const [form] = Form.useForm();

  const layout: Item[] = [
    {
      label: '手机号',
      name: 'tel',
      rules: [{ required: true, message: '请输入' }],
      element: <Input placeholder="请输入" maxLength={11} />,
    },
    {
      label: '密码',
      name: 'pwd',
      element: <Input.Password placeholder="请输入"></Input.Password>,
    },
    {
      element: (
        <Flex justify="flex-end">
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Form form={form} layout="vertical" style={{ width: 400 }}>
      <GridRender layout={layout} />
    </Form>
  );
};

export default GridOneColumn;
