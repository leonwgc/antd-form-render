import React from 'react';
import { Form, Row, Col } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';

export type FormRenderProps = {
  layoutData: Item[] | Item[][] | unknown;
  cols?: null | 1 | 2 | 3 | 4;
};

export type Item = {
  type?: React.ComponentType | string;
  name?: string;
  label?: string;
  render?: () => React.ReactElement;
  getJSON?: () => Item | null;
  elProps?: Record<string | number | symbol, unknown>;
  itemProps?: Record<string | number | symbol, unknown>;
  rules?: Rule[];
  [p: string]: unknown;
};

// item (nullable object)

const itemRender = (item: Item, key: number | string, span = 24) => {
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

const isType = (type) => (n) => {
  return Object.prototype.toString.call(n) === `[object ${type}]`;
};

const isNumber = isType('Number');

const renderTowDimensionLayout = (layoutData) => {
  return (
    <div className="afr">
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
  );
};

// 默认二维数组
// 如果是一维数组，则从上往下一行放一个 item , 除非设置了cols=2/3/4 ,自动1行cols列布局
// 如果是二维数组，则每个子数组元素的数量，则为一行显示的item数量 ,数量应该可以被24整除
export default function FormRenderer({
  layoutData,
  cols = 1,
}: FormRenderProps): React.ReactElement {
  let isOneDimensionArray = false;
  const firstItem = layoutData[0];
  if (!Array.isArray(firstItem)) {
    isOneDimensionArray = true;
  }

  const useAutoLayout = isOneDimensionArray && isNumber(cols) && cols > 1 && cols <= 4;

  if (useAutoLayout) {
    const arr = layoutData as Item[];
    const _tLayout = [];
    do {
      if (arr.length >= cols) {
        _tLayout.push(arr.slice(0, cols));
        arr.splice(0, cols);
      } else {
        let left = cols - arr.length;
        while (left--) {
          arr.push({
            render(): React.ReactElement {
              return null; // placeholder
            },
          });
        }
        _tLayout.push(arr.slice(0, cols));
        arr.length = 0;
      }
    } while (arr.length);

    return renderTowDimensionLayout(_tLayout);
  }

  return !isOneDimensionArray ? (
    renderTowDimensionLayout(layoutData)
  ) : (
    <div className="afr">
      <Row>{(layoutData as Item[]).map((item, idx) => itemRender(item, idx, 24))}</Row>
    </div>
  );
}
