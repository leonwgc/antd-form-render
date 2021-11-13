import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Radio, Form, Space, Button } from 'antd';
import FormRender from 'antd-form-render';

const StyledRow = styled.div`
  width: 600px;
`;

const TwoDimensionArray = () => {
  const layout = [
    [
      {
        type: Input,
        label: '姓名',
        name: 'name',
        rules: [{ required: true, message: '请填写' }],
        elProps: {
          placeholder: '请填写姓名',
        },
      },
      {
        type: Radio.Group,
        label: '性别',
        name: 'gender',
        rules: [{ required: true, message: '请选择' }],
        elProps: {
          options: [
            { label: '女', value: 0 },
            { label: '男', value: 1 },
          ],
        },
      },
    ],
    [
      {
        type: Input.TextArea,
        label: '个人简',
        elProps: {
          rows: 6,
        },
        placeholder: '请输入',
        name: 'bio',
      },
    ],
    [
      {
        render() {
          return (
            <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
              <Button type="default">取消</Button>
              <Button type="primary">保存</Button>
            </Space>
          );
        },
      },
    ],
  ];

  return (
    <StyledRow>
      <Form>
        <FormRender layoutData={layout}></FormRender>
      </Form>
    </StyledRow>
  );
};

export default TwoDimensionArray;
