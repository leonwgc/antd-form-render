import React from 'react';
import { Form, Col } from 'antd';
import { Item } from './Types';

export const ItemFlexRender = (item: Item, key: number | string, span = 24): React.ReactElement => {
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
          {React.createElement(type, { ...props, ...elProps } as React.Attributes)}
        </Form.Item>
      )}
    </Col>
  );
};

export const ItemSpaceRender = (item: Item, key: number | string): React.ReactElement => {
  if (typeof item.getJSON === 'function') {
    item = item.getJSON();
  }

  if (typeof item !== 'object' || !item) return null;

  // elProps 组件的其他属性
  // itemProps Form.Item的其他属性
  const { type, name, rules, label, elProps = {}, itemProps = {}, render, ...props } = item;

  return (
    <React.Fragment key={key}>
      {render ? (
        render()
      ) : (
        <Form.Item name={name} label={label} rules={rules} {...itemProps}>
          {React.createElement(type, { ...props, ...elProps } as React.Attributes)}
        </Form.Item>
      )}
    </React.Fragment>
  );
};
