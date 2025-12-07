import { create } from 'zustand';
import { todoApi } from '../api/todoApi';
import type { EventLists,TagEvents } from '../type/todo';

/**
 * Todo 状态管理接口
 */
interface TodoState {
    /** 任务列表数据(根据时间) */
    events: EventLists;
    /** 任务分类数据(根据tag) */
    tagevents:TagEvents;
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
        old_events:[],
        today_events: [],
        tomorrow_events: [],
        other_events: []
    },
    tagevents:{
        study:[],
        work:[],
        life:[]
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
            const tagData=await todoApi.TagEvent();
            
            // 验证数据结构并更新状态
            if (data) {
                set({ events: data });
                console.log('获取到的数据:', data);
            }
            //更新状态
            set({tagevents:tagData});
            console.log('获取到的数据111',tagData)
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
