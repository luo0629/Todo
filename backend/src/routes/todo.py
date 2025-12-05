from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from ..database.db_operation import get_all_events_by_tag, create_event, update_event_by_id,get_event_by_id,delete_event_by_id
from ..schemas.event import EventCreate, EventResponse
from ..database.db import get_db
from datetime import datetime, timedelta, date
from typing import Dict, List

todo_router = APIRouter()

#获取全部任务

@todo_router.get('/getAll')
def get_all_todo(tag: str, request: Request, db: Session = Depends(get_db)) -> Dict[str, List[EventResponse]]:
    """
    获取所有任务并按日期分类
    FastAPI 会自动将 EventResponse 模型转换为 JSON
    """
    # 从数据库获取 ORM 对象
    events = get_all_events_by_tag(db, tag)
    
    today_events = []
    tomorrow_events = []
    other_events = []
    old_events=[]
    today = date.today()
    
    for event in events:
        # 使用 Schema 将 ORM 对象转换为 Pydantic 模型
        event_response = EventResponse.from_orm_model(event)
        
        # 根据截止日期分类
        if event.end_time:
            end_date = event.end_time.date()
            if end_date == today:
                today_events.append(event_response)
            elif end_date == today + timedelta(days=1):
                tomorrow_events.append(event_response)
            elif event.end_time<datetime.now():
                old_events.append(event_response)
            else:
                other_events.append(event_response)

    # FastAPI 自动将 Pydantic 模型转换为 JSON
    return {
        "old_events":old_events,
        "today_events": today_events,
        "tomorrow_events": tomorrow_events,
        "other_events": other_events
    }

#新建任务
@todo_router.post('/create', response_model=EventResponse)
def create_todo(data: EventCreate, db: Session = Depends(get_db)):
    """
    创建新任务
    使用 Schema 处理序列化
    """
    # 从数据库创建任务，返回 ORM 对象
    event = create_event(db, data.title, data.tag, data.end_time)
    
    # 使用 Schema 转换为响应格式
    return EventResponse.from_orm_model(event)

@todo_router.put('/updateStateById/{id}', response_model=EventResponse)
def update_todo_state(id: int, db: Session = Depends(get_db)):
    """
    切换任务完成状态
    """
    event = get_event_by_id(db, id)
    if not event:
        raise HTTPException(status_code=404, detail="任务不存在")
    
    # 切换完成状态
    new_completed_state = not event.isCompleted
    
    # 调用更新函数，传递所有必需的参数
    event = update_event_by_id(
        db, 
        id=event.id,
        title=event.title,
        tag=event.tag,
        end_time=event.end_time,
        isCompleted=new_completed_state
    )
    
    return EventResponse.from_orm_model(event)

@todo_router.delete('/delete/{id}')
def delete_event(id: int, db: Session = Depends(get_db)):
    """
    删除任务
    """
    success = delete_event_by_id(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="任务不存在")
    return {"message": "删除成功", "id": id}

