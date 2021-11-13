import React, { useState } from 'react';
import { Form, Radio } from 'antd';
import FormRender from 'antd-form-render';

const OneColWithDynamicControl = () => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  //#region 全量渲染联动

  // 用于同步表单状态
  const [data, setData] = useState<{ gender?: string }>({});

  const layout = [
    {
      type: Radio.Group,
      label: '性别',
      name: 'gender',
      elProps: {
        options: [
          { label: '男', value: '男生' },
          { label: '女', value: '女生' },
        ],
      },
    },
    {
      type: 'div',
      label: '你是',
      elProps: {
        children: data?.gender || '未选择',
      },
    },
  ];

  //#endregion 全量渲染联动

  //#region 局部联动渲染

  // 基于Form.Item dependency/shouldUpdate 实现表单联动,局部渲染
  const layout1 = [
    {
      type: Radio.Group,
      label: '性别',
      name: 'gender',
      elProps: {
        options: [
          { label: '男', value: '男生' },
          { label: '女', value: '女生' },
        ],
      },
    },
    {
      render() {
        // dependencies
        return (
          <Form.Item label="你是" dependencies={['gender']}>
            {() => {
              const gender = form1.getFieldValue('gender');
              return gender || '未选择';
            }}
          </Form.Item>
        );
      },
    },
    {
      render() {
        // shouldUpdate
        return (
          <Form.Item shouldUpdate label="你是">
            {() => {
              return form1.getFieldValue('gender');
            }}
          </Form.Item>
        );
      },
    },
  ];

  //#endregion 局部联动渲染

  return (
    <div>
      <p>1.定义onValuesChange 同步状态到state , 触发全量渲染实现表单联动</p>

      <Form
        form={form}
        onValuesChange={(v) => {
          setData((p) => ({ ...p, ...v }));
        }}
      >
        <FormRender layoutData={layout}></FormRender>
      </Form>

      <p>2.基于Form.Item dependency/shouldUpdate 实现表单联动,局部渲染</p>

      <Form form={form1}>
        <FormRender layoutData={layout1}></FormRender>
      </Form>
    </div>
  );
};

export default OneColWithDynamicControl;
