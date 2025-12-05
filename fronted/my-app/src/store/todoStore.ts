import { create } from 'zustand';
import { todoApi } from '../api/todoApi';
import type { EventLists } from '../type/todo';

/**
 * Todo 状态管理接口
 */
interface TodoState {
    /** 任务列表数据 */
    events: EventLists;
    /** 当前选中的标签 */
    selectedTag: string;
    /** 加载状态 */
    loading: boolean;
    /** 设置选中的标签并获取对应数据 */
    setSelectedTag: (tag: string) => void;
    /** 根据标签获取任务列表 */
    fetchEvents: (tag: string) => Promise<void>;
    /** 刷新当前标签的任务列表 */
    refreshEvents: () => Promise<void>;
}

/**
 * Todo Store - 使用 Zustand 管理任务状态
 * 
 * 功能：
 * - 管理任务列表数据（今日、明日、未来任务）
 * - 管理当前选中的标签过滤
 * - 提供获取和刷新任务的方法
 */
export const useTodoStore = create<TodoState>((set, get) => ({
    // 初始状态：空的任务列表
    events: {
        today_events: [],
        tomorrow_events: [],
        other_events: []
    },
    // 默认选中"全部"标签
    selectedTag: 'all',
    // 初始加载状态为 false
    loading: false,

    /**
     * 设置选中的标签
     * 会自动触发获取对应标签的任务数据
     * @param tag - 标签值 ('all' | 'work' | 'study' | 'life')
     */
    setSelectedTag: (tag: string) => {
        set({ selectedTag: tag });
        get().fetchEvents(tag);
    },

    /**
     * 根据标签获取任务列表
     * @param tag - 标签值
     */
    fetchEvents: async (tag: string) => {
        set({ loading: true });
        try {
            // 调用封装的 API 获取任务数据
            const data = await todoApi.getAllEvents(tag);
            
            // 验证数据结构并更新状态
            if (data && data.today_events && data.tomorrow_events && data.other_events) {
                set({ events: data });
                console.log('获取到的数据:', data);
            }
        } catch (error) {
            console.error('获取数据失败:', error);
        } finally {
            set({ loading: false });
        }
    },

    /**
     * 刷新当前选中标签的任务列表
     * 用于创建、更新、删除任务后刷新数据
     */
    refreshEvents: async () => {
        const { selectedTag, fetchEvents } = get();
        await fetchEvents(selectedTag);
    }
}));
