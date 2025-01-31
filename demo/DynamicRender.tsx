import React from 'react';
import { Form, Checkbox, Input } from 'antd';
import { GridRender, Item } from '../src';

const DynamicRender = () => {
  const [form] = Form.useForm();

  const layout: Item[] = [
    {
      label: '姓名',
      name: 'name',
      element: <Input placeholder="请输入" />,
    },
    {
      itemProps: {
        noStyle: true,
      },
      element: () =>
        form.getFieldValue('name') ? (
          <div style={{ marginBottom: 24 }}>
            姓名: {form.getFieldValue('name')}
          </div>
        ) : null,
    },
    {
      label: '喜欢的运动',
      name: 'sports',
      element: <Checkbox.Group options={['篮球', '足球', '排球']} />,
    },
    {
      element: () =>
        form.getFieldValue('sports')?.length ? (
          <div> 你的选择: {form.getFieldValue('sports')?.join(', ')}</div>
        ) : (
          '未选择任何运动'
        ),
    },
  ];

  return (
    <div>
      <Form form={form}>
        <GridRender layout={layout}></GridRender>
      </Form>
    </div>
  );
};

export default DynamicRender;
