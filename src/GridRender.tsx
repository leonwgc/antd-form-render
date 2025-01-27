import React from 'react';
import { Row } from 'antd';
import type { RowProps } from 'antd';
import { GridRenderProps, Item } from './Types';
import ItemRender from './ItemRender';

const renderRows = (layout: Item[][], rest: RowProps = {}) => {
  return layout.map((arr: Item[], idx) => {
    const len = arr.length;
    const span = ~~(24 / len);

    return (
      <Row key={idx} {...rest}>
        {arr.map((item, key) => (
          <ItemRender item={item} key={key} span={span} layoutType="grid" />
        ))}
      </Row>
    );
  });
};

const GridRender: React.FC<GridRenderProps> = ({
  layout,
  columnCount = 1,
  ...rest
}) => {
  const arr = layout as Item[];
  const _layout: Item[][] = [];
  do {
    if (arr.length >= columnCount) {
      _layout.push(arr.slice(0, columnCount));
      arr.splice(0, columnCount);
    } else {
      let left = columnCount - arr.length;
      while (left--) {
        arr.push({
          render(): React.ReactElement {
            return null; // placeholder
          },
        });
      }
      _layout.push(arr.slice(0, columnCount));
      arr.length = 0;
    }
  } while (arr.length);

  return renderRows(_layout, rest as RowProps);
};

export default GridRender;
