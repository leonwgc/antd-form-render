import * as React from 'react';
export interface Item {
  type: React.Component; // 组件类型， 比如Input 等
  name: string;  //Form.Item的name
  rules?: any;  // Form.Item的rules
  label?: string; // Form.Item的label
  render?: () => React.ReactNode; //自定义 render 
  getJSON?: () => object | null; // 动态返回Item配置
  elProps?: object; // 组件的props配置 , 比如type为Input, elProps则会配置到Input
  itemProps?: object; // Form.Item的props配置，除了上面name,lable,rules三个常用的，其他的可以放在这里配置
}
export interface Props {
  layoutData: Array<Item>;
}
interface FormRenderer extends React.FC<Props> {}
declare const FormRenderer: FormRenderer;
export default FormRenderer;
