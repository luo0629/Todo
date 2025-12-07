import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';
import { useTodoStore } from '../../store/todoStore';
import type { Event } from '../../type/todo';

const TaskEcharts: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const { tagevents } = useTodoStore();

    // 获取本周的开始和结束时间
    const getCurrentWeekRange = () => {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0=周日, 1=周一, ..., 6=周六
        
        // 计算本周一的日期
        const monday = new Date(now);
        const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 如果是周日，则往前推6天
        monday.setDate(now.getDate() - daysFromMonday);
        monday.setHours(0, 0, 0, 0);
        
        // 计算本周日的日期
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);
        
        return { start: monday.getTime(), end: sunday.getTime() };
    };

    // 统计本周各天的任务数量
    const getWeeklyData = () => {
        // 初始化周一到周日的计数器
        const weekData = [0, 0, 0, 0, 0, 0, 0]; // [周一, 周二, 周三, 周四, 周五, 周六, 周日]

        // 获取本周的时间范围
        const { start, end } = getCurrentWeekRange();

        // 合并所有标签的任务
        const allEvents: Event[] = [
            ...tagevents.study,
            ...tagevents.work,
            ...tagevents.life
        ];

        // 只统计本周内的任务
        allEvents.forEach(event => {
            const eventTime = new Date(event.end_time).getTime();
            
            // 检查任务是否在本周范围内
            if (eventTime >= start && eventTime <= end) {
                const date = new Date(event.end_time);
                const dayOfWeek = date.getDay(); // 0=周日, 1=周一, ..., 6=周六
                
                // 转换为数组索引 (0=周一, 1=周二, ..., 6=周日)
                if (dayOfWeek === 0) {
                    weekData[6]++; // 周日
                } else {
                    weekData[dayOfWeek - 1]++; // 周一到周六
                }
            }
        });

        return weekData;
    };

    useEffect(() => {
        if (!chartRef.current) return;

        // 初始化 echarts 实例
        const myChart = echarts.init(chartRef.current);

        // 获取本周数据
        const weeklyData = getWeeklyData();

        // 配置项
        const option = {
            title: {
                text: '本周任务趋势',
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b}: {c} 个任务'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value',
                name: '任务数'
            },
            series: [
                {
                    name: '任务数量',
                    type: 'line',
                    smooth: true,
                    data: weeklyData,
                    itemStyle: {
                        color: '#447eebff'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(68, 126, 235, 0.3)' },
                            { offset: 1, color: 'rgba(68, 126, 235, 0.05)' }
                        ])
                    }
                }
            ]
        };

        // 设置配置项
        myChart.setOption(option);

        // 响应式调整
        const handleResize = () => {
            myChart.resize();
        };
        window.addEventListener('resize', handleResize);

        // 清理函数
        return () => {
            window.removeEventListener('resize', handleResize);
            myChart.dispose();
        };
    }, [tagevents]);

    return (
        <div
            ref={chartRef}
            style={{
                width: '100%',
                height: '400px'
            }}
        />
    );
};

export default TaskEcharts;
