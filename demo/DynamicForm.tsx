import React, { useState } from 'react';
import { Input, Radio, Form, Space, Button } from 'antd';
import { FormRender } from 'antd-form-render';

type FormData = {
  gender: '0' | '1';
  name: string;
  tels: string[];
};

const DynamicForm = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState<FormData>({
    gender: '0',
    tels: ['15901634301', '17721222222'],
    name: 'leon',
  });

  const [tels, setTels] = useState([...data.tels]); // telephone list

  const telsLayout = tels?.map((item, index) => ({
    render() {
      return (
        <Space align="start" style={{ width: '100%' }}>
          <Form.Item
            name={['tels', index]}
            rules={[
              {
                pattern: /^1\d{10}$/,
                message: '请输入正确的手机号码',
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input maxLength={11} placeholder="请输手机号" style={{ width: 350 }} />
          </Form.Item>
          {tels.length > 1 && (
            <Button
              type="link"
              onClick={() => {
                const tels = form.getFieldValue('tels');
                tels.splice(index, 1);
                form.setFieldsValue({ tels: [...tels] });
                setTels([...tels]);
              }}
            >
              删除
            </Button>
          )}
        </Space>
      );
    },
  }));

  const layout = [
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
      render() {
        return <div style={{ margin: '12px 0' }}>手机号</div>;
      },
    },

    ...telsLayout,
    {
      render() {
        return (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => {
                const tels = form.getFieldValue('tels') || [''];
                const newTels = [...tels, ''];
                form.setFieldsValue({ tels: newTels });
                setTels(newTels);
              }}
            >
              + 手机号
            </Button>
          </div>
        );
      },
    },
    {
      type: Radio.Group,
      label: '性别',
      name: 'gender',
      elProps: {
        options: [
          { label: '女', value: '0' },
          { label: '男', value: '1' },
        ],
      },
    },
    {
      getJSON() {
        return data.gender !== undefined
          ? {
              label: '性别',
              type: 'div',
              children: data.gender == '1' ? '男' : '女',
            }
          : null;
      },
    },

    {
      render() {
        return (
          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button type="default" onClick={() => form.resetFields()}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Form
        form={form}
        style={{ width: 400 }}
        layout={'vertical'}
        initialValues={data}
        onFinish={(values) => {
          console.log(values);
        }}
        onValuesChange={(c, a) => {
          setData(a);
        }}
      >
        <FormRender layoutData={layout}></FormRender>
      </Form>
    </div>
  );
};

export default DynamicForm;
