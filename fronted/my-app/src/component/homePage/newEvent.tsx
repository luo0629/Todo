import React from "react"
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import type { EventForm } from "../../type/todo";
import { todoApi } from "../../api/todoApi";
import { useTodoStore } from "../../store/todoStore";
import dayjs from "dayjs";

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
                <DatePicker 
                    showTime 
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={(current) => {
                        // 禁用今天之前的日期
                        return current && current < dayjs().startOf('day');
                    }}
                    disabledTime={(current) => {
                        // 如果选择的是今天，禁用当前时间之前的时间
                        if (current && current.isSame(dayjs(), 'day')) {
                            const now = dayjs();
                            return {
                                disabledHours: () => Array.from({ length: now.hour() }, (_, i) => i),
                                disabledMinutes: (selectedHour) => {
                                    if (selectedHour === now.hour()) {
                                        return Array.from({ length: now.minute() }, (_, i) => i);
                                    }
                                    return [];
                                },
                                disabledSeconds: (selectedHour, selectedMinute) => {
                                    if (selectedHour === now.hour() && selectedMinute === now.minute()) {
                                        return Array.from({ length: now.second() }, (_, i) => i);
                                    }
                                    return [];
                                }
                            };
                        }
                        return {};
                    }}
                />
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
