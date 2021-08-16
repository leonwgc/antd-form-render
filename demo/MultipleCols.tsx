import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Radio, Form } from 'antd';
import FormRender from 'antd-form-render';

const StyledOneRow = styled.div`
  width: 800px;
`;

const MultipleCols = () => {
  const layout = [];
  const [cols, setCols] = useState(4);

  for (let i = 0; i < 11; i++) {
    layout.push({
      type: Input,
      label: `输入框${i + 1}`,
      placeholder: '请输入',
      name: `name${i}`,
    });
  }

  return (
    <StyledOneRow>
      <Form layout="vertical">
        <div style={{ margin: '16px 0' }}>
          <Radio.Group
            onChange={(e) => setCols(Number(e.target.value))}
            optionType="button"
            value={cols}
          >
            <Radio value={1}>1行1列</Radio>
            <Radio value={2}>1行2列</Radio>
            <Radio value={3}>1行3列</Radio>
            <Radio value={4}>1行4列</Radio>
          </Radio.Group>
        </div>
        <FormRender layoutData={layout} cols={cols}></FormRender>
      </Form>
    </StyledOneRow>
  );
};

export default MultipleCols;
