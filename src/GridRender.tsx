import React from 'react';
import { Row } from 'antd';
import type { RowProps } from 'antd';
import { GridRenderProps, Item } from './Types';
import ItemRender from './ItemRender';

/**
 * render Rows layout.
 *
 * @param {Item[][]} layout layout data
 * @param {RowProps} [rest={}] props of Row
 * @returns {React.ReactElement} rendered rows
 */
const renderRows = (layout: Item[][], rest: RowProps = {}) => {
  if (layout.length === 0) return null;
  const span = ~~(24 / layout[0].length);

  return layout.map((arr: Item[], idx) => (
    <Row key={idx} {...rest}>
      {arr.map((item, key) => (
        <ItemRender item={item} key={key} span={span} layoutType="grid" />
      ))}
    </Row>
  ));
};

/**
 * Grid布局
 *
 * @param {GridRenderProps} props - The properties for the GridRender component.
 * @param {Item[]} props.layout - The layout data, an array of items to be rendered in the grid.
 * @param {number} [props.columnCount=1] - The number of columns in the grid.
 * @param {object} ..rest - Additional properties to be passed to the inner Row component.
 * @returns {React.ReactElement} The rendered grid layout.
 */
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
      _layout.push(arr.slice(0));
      arr.length = 0;
    }
  } while (arr.length);

  return renderRows(_layout, rest as RowProps);
};

export default GridRender;
