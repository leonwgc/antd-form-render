import React from 'react';
import { Form, Row, Col } from 'antd';

// item (nullable object)

const itemRender = (item, key, span = 24) => {
  if (typeof item.getJSON === 'function') {
    item = item.getJSON();
  }

  if (typeof item !== 'object' || !item) return null;

  // elProps 组件的其他属性
  // itemProps Form.Item的其他属性
  const { type, name, rules, label, elProps = {}, itemProps = {}, render, ...props } = item;

  return (
    <Col span={span} key={key}>
      {render ? (
        render()
      ) : (
        <Form.Item name={name} label={label} rules={rules} {...itemProps}>
          {React.createElement(type, { ...props, ...elProps })}
        </Form.Item>
      )}
    </Col>
  );
};

// 默认二维数组
// 如果是一维数组，则从上往下一行放一个 item
// 如果是二维数组，则每个子数组元素的数量，则为一行显示的item数量 ,数量应该可以被24整除
export default function FormRenderer({ layoutData }) {
  let useOneColumnInRow = false;
  const firstItem = layoutData[0];
  if (!Array.isArray(firstItem)) {
    useOneColumnInRow = true;
  }

  return !useOneColumnInRow ? (
    <div className="renderer">
      {layoutData.map((arr, idx) => {
        const len = arr.length;
        if (24 % len !== 0) {
          throw new Error('数组的长度必须能被24整除');
        }
        const span = 24 / len;
        return (
          <Row key={idx} gutter={{ xs: 8, sm: 16, md: 24 }}>
            {arr.map((item, subIndex) => itemRender(item, subIndex, span))}
          </Row>
        );
      })}
    </div>
  ) : (
    <div className="renderer">{layoutData.map((item, idx) => itemRender(item, idx, 24))}</div>
  );
}
