import React from 'react';
import { Row } from 'antd';
import { GridRenderProps, Item } from './Types';
import ItemRender from './ItemRender';

const renderRows = (layout: Item[][]) => {
  return layout.map((arr: Item[], idx) => {
    const len = arr.length;
    if (24 % len !== 0) {
      throw new Error('The length of the array must be divisible by 24');
    }
    const span = 24 / len;

    return (
      <Row key={idx}>
        {arr.map((item, subIndex) => (
          <ItemRender
            item={item}
            key={subIndex}
            span={span}
            layoutType="grid"
          />
        ))}
      </Row>
    );
  });
};

const GridRender: React.FC<GridRenderProps> = ({ layout, columnCount = 1 }) => {
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

  return renderRows(_layout);
};

export default GridRender;
