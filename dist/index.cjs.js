"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var k=Object.defineProperty,x=Object.defineProperties;var C=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var w=(r,e,t)=>e in r?k(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,s=(r,e)=>{for(var t in e||(e={}))h.call(e,t)&&w(r,t,e[t]);if(a)for(var t of a(e))b.call(e,t)&&w(r,t,e[t]);return r},g=(r,e)=>x(r,C(e));var l=(r,e)=>{var t={};for(var o in r)h.call(r,o)&&e.indexOf(o)<0&&(t[o]=r[o]);if(r!=null&&a)for(var o of a(r))e.indexOf(o)<0&&b.call(r,o)&&(t[o]=r[o]);return t};var _react = require('react'); var _react2 = _interopRequireDefault(_react);var _antd = require('antd');var O=({item:r,span:e=24,layoutType:t="row"})=>{let o=r;if(typeof o.getJSON=="function"&&(o=o.getJSON()),typeof o!="object"||!o)return null;let I=o,{type:i,name:n,rules:p,label:y,elProps:P={},itemProps:T={},render:d}=I,A=l(I,["type","name","rules","label","elProps","itemProps","render"]),c={};return t==="row"&&(c=g(s({},c),{span:e})),_react2.default.createElement(t==="row"?_antd.Col:_react2.default.Fragment,c,d?d():_react2.default.createElement(_antd.Form.Item,s({name:n,label:y,rules:p},T),_react2.default.createElement(i,s(s({},A),P))))},u=O;var _=t=>{var o=t,{layoutData:r}=o,e=l(o,["layoutData"]);return _react2.default.createElement(_antd.Space,s({},e),r.map((i,n)=>_react2.default.createElement(u,{item:i,key:n,layoutType:"space"})))},R=_;var J=r=>e=>Object.prototype.toString.call(e)===`[object ${r}]`,v=J("Number"),S=r=>_react2.default.createElement(_react2.default.Fragment,null,r.map((e,t)=>{let o=e.length;if(24%o!==0)throw new Error("The length of the array must be divisible by 24");let i=24/o;return _react2.default.createElement(_antd.Row,{key:t},e.map((n,p)=>_react2.default.createElement(u,{item:n,key:p,span:i,layoutType:"row"})))})),Z= exports.FormRender =({layoutData:r,cols:e=1})=>{let t=!1,o=r[0];if(Array.isArray(o)||(t=!0),t&&v(e)&&e>1&&e<=4){let n=r,p=[];do if(n.length>=e)p.push(n.slice(0,e)),n.splice(0,e);else{let y=e-n.length;for(;y--;)n.push({render(){return null}});p.push(n.slice(0,e)),n.length=0}while(n.length);return S(p)}return t?_react2.default.createElement(_react2.default.Fragment,null,_react2.default.createElement(_antd.Row,null,r.map((n,p)=>_react2.default.createElement(u,{item:n,key:p,span:24,layoutType:"row"})))):_react2.default.createElement(_react2.default.Fragment,null,S(r))},D= exports.FormSpaceRender =R;exports.FormRender = Z; exports.FormSpaceRender = D;
