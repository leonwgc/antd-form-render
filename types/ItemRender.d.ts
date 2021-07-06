import React from 'react';
import { Item, LayoutType } from './Types';
declare type ItemRenderProps = {
  item: Item;
  span?: number | undefined;
  layoutType: LayoutType;
};
declare const ItemRender: ({ item, span, layoutType }: ItemRenderProps) => React.ReactElement;
export default ItemRender;
