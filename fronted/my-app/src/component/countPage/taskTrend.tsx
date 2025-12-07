import React from "react";
import TaskEcharts from "./taskEcharts";


const TaskTrend:React.FC=()=>{

    return (
        <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 8px 12px rgba(0,0,0,0.05)',
                margin: '16px',
                transition: 'all 0.3s ease'
        }}>
            <div style={{fontWeight:'bolder',fontSize:'18px'}}>
                任务趋势
            </div>
            <TaskEcharts/>
        </div>
    );
}

export default TaskTrend;