import React from 'react';
import { Col, Form, Space, Row } from 'antd';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var ItemRender = function ItemRender(_ref) {
  var item = _ref.item,
      _ref$span = _ref.span,
      span = _ref$span === void 0 ? 24 : _ref$span,
      _ref$layoutType = _ref.layoutType,
      layoutType = _ref$layoutType === void 0 ? 'row' : _ref$layoutType;
  var _item = item;

  if (typeof _item.getJSON === 'function') {
    _item = _item.getJSON();
  }

  if (_typeof(_item) !== 'object' || !_item) return null;

  var _item2 = _item,
      type = _item2.type,
      name = _item2.name,
      rules = _item2.rules,
      label = _item2.label,
      _item2$elProps = _item2.elProps,
      elProps = _item2$elProps === void 0 ? {} : _item2$elProps,
      _item2$itemProps = _item2.itemProps,
      itemProps = _item2$itemProps === void 0 ? {} : _item2$itemProps,
      render = _item2.render,
      props = _objectWithoutProperties(_item2, ["type", "name", "rules", "label", "elProps", "itemProps", "render"]);

  var wrapperProps = {};

  if (layoutType === 'row') {
    wrapperProps = _objectSpread2(_objectSpread2({}, wrapperProps), {}, {
      span: span
    });
  }

  return /*#__PURE__*/React.createElement(layoutType === 'row' ? Col : React.Fragment, wrapperProps, render ? render() : /*#__PURE__*/React.createElement(Form.Item, _extends({
    name: name,
    label: label,
    rules: rules
  }, itemProps), /*#__PURE__*/React.createElement(type, _objectSpread2(_objectSpread2({}, props), elProps))));
};

/**
 * 等间距排列 (常用于列表页面的搜索等)
 *
 * @export
 * @param {SpaceLayoutProps} {
 *   layoutData,
 *   ...props 参考：antd Space组件的props
 * }
 * @return {*}  {React.ReactElement}
 */

function SpaceLayout(_ref) {
  var layoutData = _ref.layoutData,
      props = _objectWithoutProperties(_ref, ["layoutData"]);

  return /*#__PURE__*/React.createElement(Space, props, layoutData.map(function (item, idx) {
    return /*#__PURE__*/React.createElement(ItemRender, {
      item: item,
      key: idx,
      layoutType: "space"
    });
  }));
}

var isType = function isType(type) {
  return function (n) {
    return Object.prototype.toString.call(n) === "[object ".concat(type, "]");
  };
};

var isNumber = isType('Number');

var renderTowDimensionLayout = function renderTowDimensionLayout(layoutData) {
  return /*#__PURE__*/React.createElement("div", {
    className: "afr-flex"
  }, layoutData.map(function (arr, idx) {
    var len = arr.length;

    if (24 % len !== 0) {
      throw new Error('The length of the array must be divisible by 24');
    }

    var span = 24 / len;
    return /*#__PURE__*/React.createElement(Row, {
      key: idx
    }, arr.map(function (item, subIndex) {
      return /*#__PURE__*/React.createElement(ItemRender, {
        item: item,
        key: subIndex,
        span: span,
        layoutType: "row"
      });
    }));
  }));
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


function FormRender(_ref) {
  var layoutData = _ref.layoutData,
      _ref$cols = _ref.cols,
      cols = _ref$cols === void 0 ? 1 : _ref$cols;
  var isOneDimensionArray = false;
  var firstItem = layoutData[0];

  if (!Array.isArray(firstItem)) {
    isOneDimensionArray = true;
  }

  var useAutoLayout = isOneDimensionArray && isNumber(cols) && cols > 1 && cols <= 4;

  if (useAutoLayout) {
    var arr = layoutData;
    var _tLayout = [];

    do {
      if (arr.length >= cols) {
        _tLayout.push(arr.slice(0, cols));

        arr.splice(0, cols);
      } else {
        var left = cols - arr.length;

        while (left--) {
          arr.push({
            render: function render() {
              return null; // placeholder
            }
          });
        }

        _tLayout.push(arr.slice(0, cols));

        arr.length = 0;
      }
    } while (arr.length);

    return renderTowDimensionLayout(_tLayout);
  }

  return !isOneDimensionArray ? renderTowDimensionLayout(layoutData) : /*#__PURE__*/React.createElement("div", {
    className: "afr-flex"
  }, /*#__PURE__*/React.createElement(Row, null, layoutData.map(function (item, idx) {
    return /*#__PURE__*/React.createElement(ItemRender, {
      item: item,
      key: idx,
      span: 24,
      layoutType: "row"
    });
  })));
}

export default FormRender;
export { FormRender, SpaceLayout as FormSpaceRender };
