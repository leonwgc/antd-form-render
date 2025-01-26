import React, { useState } from 'react';
import { Input, Radio, Form } from 'antd';
import { FormSpaceRender, Item } from 'antd-form-render';

const SpaceLayout = () => {
  const layout: Item[] = [];
  const [space, setSpace] = useState(8);

  for (let i = 0; i < 3; i++) {
    layout.push({
      type: Input,
      label: `输入框${i + 1}`,
      placeholder: '请输入',
      name: `name${i}`,
    });
  }

  return (
    <div style={{ paddingTop: 32, width: 800 }}>
      <Form layout="horizontal">
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
        <FormSpaceRender layoutData={layout} size={space}></FormSpaceRender>
      </Form>
    </div>
  );
};

export default SpaceLayout;
