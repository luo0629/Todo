import http from './index';
import type { EventLists, EventForm } from '../type/todo';

/**
 * Todo API 服务
 * 封装所有与 Todo 相关的 API 调用
 */
export const todoApi = {
    /**
     * 获取所有任务
     * @param tag - 标签过滤 ('all' | 'work' | 'study' | 'life')
     * @returns 返回分类后的任务列表
     */
    async getAllEvents(tag: string): Promise<EventLists> {
        const res = await http.get("/todo/getAll", { tag }) as unknown;
        return res as EventLists;
    },

    /**
     * 创建新任务
     * @param payload - 任务数据
     * @returns 返回创建的任务
     */
    async createEvent(payload: EventForm): Promise<any> {
        return await http.post('/todo/create', payload);
    },

    /**
     * 更新任务
     * @param id - 任务 ID
     * @param payload - 更新的任务数据
     * @returns 返回更新后的任务
     */
    async TagEvent(): Promise<any> {
        return await http.get('/todo/tagEvents/');
    },

    /**
     * 删除任务
     * @param id - 任务 ID
     * @returns 返回删除结果
     */
    async deleteEvent(id: number): Promise<any> {
        return await http.delete(`/todo/delete/${id}`);
    },

    /**
     * 切换任务完成状态
     * @param id - 任务 ID
     * @returns 返回更新后的任务
     */
    async updateStateById(id: number): Promise<any> {
        return await http.put(`/todo/updateStateById/${id}`);
    }
};
