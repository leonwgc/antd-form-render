import React, { useState } from 'react';
import { Input, Radio, Form, Button } from 'antd';
import { SpaceRender, Item } from '../src';

const SpaceLayout = () => {
  const [form] = Form.useForm();
  const layout: Item[] = [];
  const [space, setSpace] = useState(8);

  for (let i = 0; i < 3; i++) {
    layout.push({
      name: `name${i}`,
      label: `输入框${i + 1}`,
      element: <Input placeholder="请输入" />,
    });
  }

  layout.push({
    element: (
      <Button
        type="primary"
        onClick={() => {
          console.log(form.getFieldsValue());
        }}
      >
        submit
      </Button>
    ),
  });

  return (
    <Form form={form} layout="horizontal">
      <div style={{ marginBottom: 24 }}>
        <Radio.Group
          onChange={(e) => setSpace(Number(e.target.value))}
          optionType="button"
          value={space}
        >
          <Radio value={8}>8px</Radio>
          <Radio value={16}>16px</Radio>
          <Radio value={24}>24px</Radio>
          <Radio value={32}>32px</Radio>
        </Radio.Group>
      </div>

      <SpaceRender layout={layout} size={space} />
    </Form>
  );
};

export default SpaceLayout;
