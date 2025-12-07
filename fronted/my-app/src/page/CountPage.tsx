import React,{useEffect} from "react";
import PageHead from "../component/pageHead";
import OverView from "../component/countPage/overview";
import TaskTrend from "../component/countPage/taskTrend";
import { useTodoStore } from "../store/todoStore";

const CountPage:React.FC=()=>{
    const {tagevents,fetchEvents}=useTodoStore();
    useEffect(() => {
        fetchEvents('all');
    }, []);
    return(
        <div>
            <PageHead title="任务统计"/>
            <OverView data={tagevents}/>
            <TaskTrend/>
        </div>
    )
}
export default CountPage;