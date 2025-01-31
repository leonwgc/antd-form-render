import React from 'react';
import { Form, Col } from 'antd';
import { Item, layoutType } from './Types';

type ItemRenderProps = {
  item: Item;
  span?: number | undefined;
  layoutType: layoutType;
};

const ItemRender: React.FC<ItemRenderProps> = ({
  item,
  span = 24,
  layoutType,
}) => {
  let _item = item;
  if (typeof _item.getJSON === 'function') {
    _item = _item.getJSON();
  }

  if (typeof _item !== 'object' || !_item) return null;

  const {
    type,
    name,
    rules,
    label,
    element,
    elProps = {},
    itemProps = {},
    render,
    ...rest
  } = _item;

  let wrapperProps: Record<string, unknown> = {};

  if (layoutType === 'grid') {
    wrapperProps = { ...wrapperProps, span };
  }
  return React.createElement(
    layoutType === 'grid' ? Col : React.Fragment,
    wrapperProps,
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      {...rest}
      {...itemProps}
      shouldUpdate={
        itemProps.shouldUpdate ||
        typeof element === 'function' ||
        typeof render === 'function'
      }
    >
      {typeof element !== 'undefined'
        ? element
        : typeof render !== 'undefined'
        ? render
        : typeof type !== 'undefined' &&
          React.createElement(type, elProps as React.Attributes)}
    </Form.Item>
  );
};

export default ItemRender;
