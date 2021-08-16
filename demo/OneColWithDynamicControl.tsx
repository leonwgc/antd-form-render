import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button, Radio, message } from 'antd';
import FormRender from 'antd-form-render';

const StyledOneRow = styled.div`
  width: 600px;
`;

const StyledP = styled.p`
  padding: 10px;
`;

const OneColWithDynamicControl = () => {
  const [form] = Form.useForm();

  const [form1] = Form.useForm();

  // 用于同步表单状态
  const [data, setData] = useState({});

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
        children: data.gender || '未选择',
      },
    },
    {
      type: Button,
      elProps: {
        htmlType: 'submit',
        type: 'primary',
        children: '确定',
      },
      itemProps: {
        wrapperCol: { offset: 6 },
      },
    },
  ];

  // 基于antd , dependency 实现表单联动
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
      type: Button,
      elProps: {
        htmlType: 'submit',
        type: 'primary',
        children: '确定',
      },
      itemProps: {
        wrapperCol: { offset: 6 },
      },
    },
  ];

  return (
    <StyledOneRow>
      <StyledP>1.定义onValuesChange 同步状态到state , 触发重新渲染实现表单联动</StyledP>
      <Form
        form={form}
        onValuesChange={(v) => {
          setData((p) => ({ ...p, ...v }));
        }}
        labelCol={{ span: 6 }}
        onFinish={(v) => {
          message.success(JSON.stringify(v));
        }}
      >
        <FormRender layoutData={layout}></FormRender>
      </Form>

      <StyledP>2.利用Form.Item dependencies 和自定义render 实现表单联动</StyledP>
      <Form
        form={form1}
        labelCol={{ span: 6 }}
        onFinish={(v) => {
          message.success(JSON.stringify(v));
        }}
      >
        <FormRender layoutData={layout1}></FormRender>
      </Form>
    </StyledOneRow>
  );
};

export default OneColWithDynamicControl;
