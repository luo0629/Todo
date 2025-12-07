import React, { useEffect } from "react";
import PageHead from "../component/pageHead";
import TaskClassify from "../component/classifyPage/classifyComponent";
import { useTodoStore } from "../store/todoStore";
import {ReconciliationFilled, ReadFilled, HomeFilled} from "@ant-design/icons";

const ClassifyPage:React.FC=()=>{
    const { tagevents, fetchEvents } = useTodoStore();

    useEffect(() => {
        fetchEvents('all');
    }, []);

    return(
        <div>
            <PageHead title="任务分类"/>
            
            <TaskClassify 
                data={tagevents.work || []}
                label="工作"
                icon={<ReconciliationFilled style={{fontSize:'22px',color:'#8dc5f9ff'}}/>}
                iconBgColor="#ebf5ffff"
                progressColor="#4B89FF"
            />
            
            <TaskClassify 
                data={tagevents.study || []}
                label="学习"
                icon={<ReadFilled style={{fontSize:'22px',color:'#9d7cf9ff'}}/>}
                iconBgColor="#f0e7ff"
                progressColor="#7C4DFF"
            />
            
            <TaskClassify 
                data={tagevents.life || []}
                label="生活"
                icon={<HomeFilled style={{fontSize:'22px',color:'#5fc98eff'}}/>}
                iconBgColor="#eaf7ee"
                progressColor="#30A46C"
            />
        </div>
    )
}
export default ClassifyPage;