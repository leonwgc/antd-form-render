import React from 'react';
import { Item, layoutType } from './Types';
type ItemRenderProps = {
    item: Item;
    span?: number | undefined;
    layoutType: layoutType;
};
declare const ItemRender: React.FC<ItemRenderProps>;
export default ItemRender;
