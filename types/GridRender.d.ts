import React from 'react';
import { GridRenderProps } from './Types';
/**
 * Grid布局
 *
 * @param {GridRenderProps} props - The properties for the GridRender component.
 * @param {Item[]} props.layout - The layout data, an array of items to be rendered in the grid.
 * @param {number} [props.columnCount=1] - The number of columns in the grid.
 * @param {object} ..rest - Additional properties to be passed to the inner Row component.
 * @returns {React.ReactElement} The rendered grid layout.
 */
declare const GridRender: React.FC<GridRenderProps>;
export default GridRender;
