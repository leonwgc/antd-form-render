import React from 'react';
import { Row } from 'antd';
import { FormRenderProps, Item } from './Types';
import ItemRender from './ItemRender';
export { default as FormSpaceRender } from './SpaceLayout';

const isType = (type) => (n) => {
  return Object.prototype.toString.call(n) === `[object ${type}]`;
};

const isNumber = isType('Number');

const renderTowDimensionLayout = (layoutData) => {
  return (
    <div className="afr-flex">
      {layoutData.map((arr, idx) => {
        const len = arr.length;
        if (24 % len !== 0) {
          throw new Error('数组的长度必须能被24整除');
        }
        const span = 24 / len;

        return (
          <Row key={idx} gutter={{ xs: 8, sm: 16, md: 24 }}>
            {arr.map((item, subIndex) => (
              <ItemRender item={item} key={subIndex} span={span} layoutType="row" />
            ))}
          </Row>
        );
      })}
    </div>
  );
};

/**
 * 等分空间布局, 每个组件等分一行空间
 *
 * 一维数组:从上往下一行放一个组件 ,设置了cols则一行显示cols(1/2/3/4)个组件
 *
 * 二维数组:子数组配置的所有组件渲染为一行（不定列布局）
 *
 * 数组（或子数组）内组件会等分一行所占空间，内部采用Row,Col布局
 *
 * @export
 * @param {FormRenderProps} {
 *   layoutData: Item[] | Item[][];
 *   cols = 1 | 2 | 3 | 4,
 * }
 * @return {*}  {React.ReactElement}
 */
export default function FormRenderer({
  /**
   * 1或2维数组，存储组件配置信息/自定义渲染组件
   */
  layoutData,
  /**
   * 定义一行渲染几个组件，layoutData为一维数组时生效, 可以是: 1 | 2 | 3 | 4, 默认1,
   */
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
    <div className="afr-flex">
      <Row>
        {(layoutData as Item[]).map((item, idx) => (
          <ItemRender item={item} key={idx} span={24} layoutType="row" />
        ))}
      </Row>
    </div>
  );
}
