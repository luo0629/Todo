
export interface Event{
    id:number,
    title:string,
    tag:string,
    created_time:string,
    end_time:string,
    isCompleted?: boolean,
}

export interface EventForm{
    title:string,
    tag:string,
    end_time:string,
}

export interface EventLists{
    today_events:Event[],
    tomorrow_events:Event[],
    other_events:Event[],
}