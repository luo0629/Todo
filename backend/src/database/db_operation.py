from sqlalchemy.orm import Session
from datetime import datetime
from ..models.event import Todo_Event
from typing import List

def get_all_events_by_tag(db: Session, tag: str) -> List[Todo_Event]:
    """
    获取所有任务（按标签过滤）
    返回 ORM 对象列表，序列化由 Schema 层处理
    """
    if tag == 'all':
        events = db.query(Todo_Event).all()
    else:
        events = db.query(Todo_Event).filter(
            Todo_Event.tag == tag
        ).all()
    return events

def create_event(db: Session, title: str, tag: str, end_time: datetime) -> Todo_Event:
    """
    创建新任务
    返回 ORM 对象，序列化由 Schema 层处理
    """
    if isinstance(end_time, str):
        try:
            end_time = datetime.fromisoformat(end_time)
        except Exception:
            pass
    event = Todo_Event(title=title, tag=tag, end_time=end_time)
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

def get_event_by_id(db:Session,id:int):
    return db.query(Todo_Event).filter(Todo_Event.id==id).first()


def update_event_by_id(db: Session, id:int, title: str, tag: str, 
                       end_time: datetime , isCompleted: bool ) -> Todo_Event:
    """
    根据 ID 更新任务
    """
    event = db.get(Todo_Event, id)
    if not event:
        return None
    
    event.title = title
    event.tag = tag
    if isinstance(end_time, str):
        try:
            end_time = datetime.fromisoformat(end_time)
        except Exception:
            pass
    event.end_time = end_time
    event.isCompleted = isCompleted
    
    db.commit()
    db.refresh(event)
    return event



def delete_event_by_id(db: Session, id: int) -> bool:
    """
    根据 ID 删除任务
    返回是否删除成功
    """
    event = db.get(Todo_Event, id)
    if not event:
        return False
    
    db.delete(event)
    db.commit()
    return True
