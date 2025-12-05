import React from "react"
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import type { EventForm } from "../type/todo";
import { todoApi } from "../api/todoApi";
import { useTodoStore } from "../store/todoStore";

const NewEvent: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
    const [form] = Form.useForm();
    const refreshEvents = useTodoStore(state => state.refreshEvents);

    const onFinish = async (values: any) => {
        const payload: EventForm = {
            title: values.title,
            tag: values.tag,
            end_time: values.end_time?.format?.("YYYY-MM-DD HH:mm:ss") || values.end_time
        };
        console.log(payload);
        try {
            await todoApi.createEvent(payload);
            message.success('任务创建成功！');
            form.resetFields();
            await refreshEvents(); // 刷新任务列表
            onSuccess?.(); // 关闭弹窗
        } catch (err) {
            console.log(err);
            message.error('任务创建失败，请重试');
        }
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item label="任务名称" name="title" rules={[{ required: true, message: '请输入任务名称' }]}>
                <Input placeholder="请输入任务名称" />
            </Form.Item>
            <Form.Item label="任务标签" name="tag" rules={[{ required: true, message: '请选择任务标签' }]}>
                <Select
                    placeholder="请选择标签"
                    options={[
                        { label: '工作', value: 'work' },
                        { label: '学习', value: 'study' },
                        { label: '生活', value: 'life' }
                    ]}
                />
            </Form.Item>
            <Form.Item label="任务结束时间" name="end_time" rules={[{ required: true, message: '请选择任务结束时间' }]}>
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}

export default NewEvent;
