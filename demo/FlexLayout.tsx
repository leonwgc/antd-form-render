import React, { useState } from 'react';
import { Input, Radio, Form, Button } from 'antd';
import { FlexRender, Item } from '../src';

const FlexLayout = () => {
  const [form] = Form.useForm();
  const layout: Item[] = [];
  const [gap, setGap] = useState(8);

  for (let i = 0; i < 3; i++) {
    layout.push({
      name: `name${i}`,
      type: Input,
      label: `输入框${i + 1}`,
      elProps: {
        placeholder: '请输入',
      },
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
          onChange={(e) => setGap(Number(e.target.value))}
          optionType="button"
          value={gap}
        >
          <Radio value={8}>8px</Radio>
          <Radio value={16}>16px</Radio>
          <Radio value={24}>24px</Radio>
          <Radio value={32}>32px</Radio>
        </Radio.Group>
      </div>

      <FlexRender layout={layout} gap={gap} justify="flex-end" />
    </Form>
  );
};

export default FlexLayout;
