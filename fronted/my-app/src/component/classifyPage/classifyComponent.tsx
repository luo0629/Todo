import React from "react";
import type { TaskClassifyProps } from "../../type/todo";


/**
 * 任务分类组件 - 显示任务统计和完成进度
 */
const TaskClassify:React.FC<TaskClassifyProps>=({data, label, icon, iconBgColor, progressColor})=>{
    // 计算总任务数
    const totalTasks = data.length;
    
    // 计算已完成任务数
    const completedTasks = data.filter(event => event.isCompleted).length;
    
    // 计算待完成任务数
    const pendingTasks = totalTasks - completedTasks;
    
    // 计算完成百分比
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    return(
        <div>
            <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 8px 12px rgba(0,0,0,0.05)',
                margin: '16px',
                transition: 'all 0.3s ease'
        }}>
            <div style={{display:'flex',marginLeft:'5px',alignItems:'center'}}>
                <div style={{
                    backgroundColor: iconBgColor,
                    width:'37px',
                    height:'37px',
                    borderRadius:'18.5px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
            }}>
                    {icon}
                </div>
                <div style={{fontSize:'20px',fontWeight:'bolder',marginLeft:'10px'}}>{label}</div>
                <div style={{fontSize:'15px',fontWeight:'500',color:'#666',marginLeft:'auto'}}>{totalTasks}个任务</div>
            </div>
            <div style={{display:'flex',marginLeft:'5px',alignItems:'center',marginTop:'10px'}}>
                <div style={{fontSize:'15px',fontWeight:'500',color:'#666',marginLeft:'5px'}}>{pendingTasks}个待完成</div>
                <div style={{fontSize:'15px',fontWeight:'500',color:'#666',marginLeft:'auto'}}>{completedTasks}个已完成</div>
            </div>
            
            {/* 进度条 */}
            <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginTop: '12px',
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
    )
}

export default TaskClassify;