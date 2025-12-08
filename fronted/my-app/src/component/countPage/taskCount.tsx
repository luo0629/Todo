import React from "react";
import TaskDescription from "./taskDescription";
import type { TagEvents } from "../../type/todo";

const TaskCount:React.FC<{data:TagEvents}>=({data})=>{

    return(
        <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 8px 12px rgba(0,0,0,0.05)',
                margin: '16px',
                transition: 'all 0.3s ease'
        }}>
            <div style={{fontWeight:'bolder',fontSize:'18px'}}>
                分类统计
            </div>
            <TaskDescription data={data.work} label="工作" progressColor="#4B89FF" />
            <TaskDescription data={data.life} label="生活" progressColor="#30A46C" />
            <TaskDescription data={data.study} label="学习" progressColor="#7C4DFF" />
        </div>
    )
}

export default TaskCount;