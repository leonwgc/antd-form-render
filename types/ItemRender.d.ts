import React from 'react';
import { Item, LayoutType } from './Types';
type ItemRenderProps = {
    item: Item;
    span?: number | undefined;
    layoutType: LayoutType;
};
declare const ItemRender: React.FC<ItemRenderProps>;
export default ItemRender;
