import React from "react";
import type { TagEvents } from "../../type/todo";

const OverView:React.FC<{data:TagEvents}>=({data})=>{
    const eventSum=data.life.length+data.study.length+data.work.length
    const finished=data.life.filter(event=>event.isCompleted).length+data.study.filter(event=>event.isCompleted).length+data.work.filter(event=>event.isCompleted).length
    const inProgress=eventSum-finished
    const completionRate=eventSum>0?Math.round((finished/eventSum)*100):0

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
                任务概览
            </div>
            <div style={{display:'flex',marginTop:'20px',justifyContent:'space-around'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1}}>
                    <div style={{fontSize:'22px',fontWeight:'bolder',color:'#447eebff'}}>{finished}</div>
                    <div style={{fontSize:'15px',fontWeight:'500',color:'#666'}}>已完成</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1}}>
                    <div style={{fontSize:'22px',fontWeight:'bolder',color:'#ffca67ff'}}>{inProgress}</div>
                    <div style={{fontSize:'15px',fontWeight:'500',color:'#666'}}>进行中</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1}}>
                    <div style={{fontSize:'22px',fontWeight:'bolder',color:'#78cc56ff'}}>{completionRate}%</div>
                    <div style={{fontSize:'15px',fontWeight:'500',color:'#666'}}>完成率</div>
                </div>
            </div>
        </div>
    );
}
export default OverView;