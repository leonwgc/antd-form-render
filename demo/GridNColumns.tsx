import React, { useState } from 'react';
import { Input, Radio, Form } from 'antd';
import { GridRender, Item } from '../src';

const GridNColumns = () => {
  const layout: Item[] = [];
  const [cols, setCols] = useState(4);

  for (let i = 0; i < 11; i++) {
    layout.push({
      type: Input,
      label: `输入框${i + 1}`,

      name: `name${i}`,
      elProps: {
        placeholder: '请输入',
      },
    });
  }

  return (
    <div style={{ paddingTop: 32, width: 800 }}>
      <Form layout="vertical">
        <div style={{ marginBottom: 24 }}>
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
        <GridRender layout={layout} columnCount={cols}></GridRender>
      </Form>
    </div>
  );
};

export default GridNColumns;
