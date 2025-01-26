import React from 'react';
import { Form, Col } from 'antd';
import { Item, LayoutType } from './Types';

type ItemRenderProps = {
  item: Item;
  span?: number | undefined;
  layoutType: LayoutType;
};

const ItemRender = ({
  item,
  span = 24,
  layoutType = 'row',
}: ItemRenderProps): React.ReactElement => {
  let _item = item;
  if (typeof _item.getJSON === 'function') {
    _item = _item.getJSON();
  }

  if (typeof _item !== 'object' || !_item) return null;

  const { type, name, rules, label, elProps = {}, itemProps = {}, render, ...props } = _item;

  let wrapperProps: Record<string, unknown> = {};

  if (layoutType === 'row') {
    wrapperProps = { ...wrapperProps, span };
  }
  return React.createElement(
    layoutType === 'row' ? Col : React.Fragment,
    wrapperProps,
    render ? (
      render()
    ) : (
      <Form.Item name={name} label={label} rules={rules} {...itemProps}>
        {React.createElement(type, { ...props, ...elProps } as React.Attributes)}
      </Form.Item>
    )
  );
};

export default ItemRender;
