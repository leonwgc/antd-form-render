import React, { useState, useEffect } from 'react';
import { Input, Radio, Form, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import FormRender from 'antd-form-render';

const DynamicForm = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState<any>({
    jobs: ['job1', 'job2', 'job3'],
  });

  const jobExpLayout = data.jobs?.map((ex, index) => ({
    name: ['jobs', index],
    type: Input,
    label: '工作经历' + (index + 1),
    elProps: {
      placeholder: '请填写',
      addonAfter: data.jobs.length > 1 && (
        <MinusCircleOutlined
          onClick={() => {
            const { jobs = [''] } = form.getFieldsValue();

            jobs.splice(index, 1);

            // form
            form.setFieldsValue({ jobs: jobs });

            // state
            const newData = { ...data, jobs: jobs };
            setData(newData);
          }}
        />
      ),
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
      type: Radio.Group,
      label: '性别',
      name: 'gender',
      elProps: {
        options: [
          { label: '女', value: 0 },
          { label: '男', value: 1 },
        ],
      },
    },
    {
      getJSON() {
        return data.gender !== undefined
          ? {
              label: '性别',
              type: 'div',
              children: data.gender == 1 ? '男' : '女',
            }
          : null;
      },
    },
    // 动态更新组件
    ...jobExpLayout,
    {
      render() {
        return (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={() => {
                const { jobs = [''] } = form.getFieldsValue();
                const newJobs = jobs.concat(['']);
                form.setFieldsValue({ jobs: newJobs });

                setData({ ...data, jobs: newJobs });
              }}
            >
              添加工作经历
            </Button>
          </div>
        );
      },
    },
    {
      type: Input.TextArea,
      label: '个人简',
      elProps: {
        rows: 6,
      },
      placeholder: '请输入',
      name: 'bio',
    },

    ,
    {
      render() {
        return (
          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button type="default">取消</Button>
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
        initialValues={data}
        onFinish={(values) => {
          console.log(values);
          console.log('data:', data);
        }}
        form={form}
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
