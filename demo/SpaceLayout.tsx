import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Radio, Form } from 'antd';
import { FormSpaceRender } from 'antd-form-render';

const StyledOneRow = styled.div`
  width: 1000px;
`;

const SpaceLayout = () => {
  const layout = [];
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
    <StyledOneRow>
      <Form layout="horizontal">
        <div style={{ margin: '16px 0' }}>
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
    </StyledOneRow>
  );
};

export default SpaceLayout;
