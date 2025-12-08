import React from "react";
import type { TaskDescriptionProps } from "../../type/todo";

const TaskDescription:React.FC<TaskDescriptionProps>=({data, label, progressColor})=>{
    // 计算总任务数
    const totalTasks = data.length;
    
    // 计算已完成任务数
    const completedTasks = data.filter(event => event.isCompleted).length;
    
    // 计算完成百分比
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    return(
        <div>
            <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '10px',
                transition: 'all 0.3s ease'
            }}>
                <div style={{ display: 'flex', marginLeft: '5px', alignItems: 'center' }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bolder', marginLeft: '5px' }}>{label}</div>
                    <div style={{ fontSize: '12px', fontWeight: '500', color: '#666', marginLeft: 'auto' }}>{totalTasks}个任务</div>
                </div>

                {/* 进度条 */}
                <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    marginTop: '8px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${completionPercentage}%`,
                        height: '100%',
                        backgroundColor: progressColor,
                        borderRadius: '4px',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

        </div>
    );
}
export default TaskDescription;