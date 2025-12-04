from fastapi import APIRouter,Depends,HTTPException,Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
import json
from ..database.db_operation import (get_all_events,create_event)
from ..schemas.event import EventCreat
from ..database.db import get_db
from datetime import datetime,timedelta,date


todo_router=APIRouter()

@todo_router.get('/getAll')
def get_all_todo(tag:str,request:Request,db:Session=Depends(get_db)):
    events=get_all_events(db,tag)
    today_events=[]
    tomorrow_events=[]
    other_events=[]
    today=date.today()
    
    for e in events:
        # e 是字典，end_time 是 ISO 格式字符串
        end_time_str = e.get("end_time")
        if end_time_str:
            end_date = datetime.fromisoformat(end_time_str).date()
            if end_date==today:
                today_events.append(e)
            elif end_date==today+timedelta(days=1):
                tomorrow_events.append(e)
            else:
                other_events.append(e)
        else:
            other_events.append(e)

    return {
        "today_events":today_events,
        "tomorrow_events":tomorrow_events,
        "other_events":other_events
    }

@todo_router.post('/create')
def create_todo(data:EventCreat,db:Session=Depends(get_db)):
    title=data.title
    tag=data.tag
    end_time=data.end_time
    return create_event(db,title,tag,end_time)


