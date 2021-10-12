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
 * 一维数组:从上往下一行放一个表单项 ,如果设置了cols=2/3/4 ,则一行放置cols(2/3/4)个表单项
 * 二维数组:子数组配置的表单项目会被渲染为一行
 *
 * @export
 * @param {FormRenderProps} {
 *   layoutData,
 *   cols = 1,
 * }
 * @return {*}  {React.ReactElement}
 */
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
    <div className="afr-flex">
      <Row>
        {(layoutData as Item[]).map((item, idx) => (
          <ItemRender item={item} key={idx} span={24} layoutType="row" />
        ))}
      </Row>
    </div>
  );
}
