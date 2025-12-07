import React from "react"
import EventList from "./eventList";
import type { EventLists } from "../../type/todo";

const EventPage:React.FC<{Events:EventLists}>=({Events})=>{

    return(
        <>  
            <div style={{marginBottom:"10px"}}>
                <EventList data={Events.old_events} label="历史任务" />
            </div>
            <div style={{marginBottom:"10px"}}>
                <EventList data={Events.today_events} label="今日任务" />
            </div>
            <div style={{marginBottom:"10px"}}>
                <EventList data={Events.tomorrow_events} label="明日任务" />
            </div>
            <div style={{marginBottom:"10px"}}>
                <EventList data={Events.other_events} label="未来任务" />
            </div>
        </>
    )
}

export default EventPage;