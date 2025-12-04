from sqlalchemy.orm import Session
from datetime import datetime
from ..models.event import Todo_Event

#获取全部任务
def event_to_dict(e: Todo_Event):
    return {
        "id": e.id,
        "title": e.title,
        "tag": e.tag,
        "created_time": e.created_time.isoformat() if e.created_time else None,
        "end_time": e.end_time.isoformat() if e.end_time else None,
        "isCompleted": bool(e.isCompleted),
    }

def get_all_events(db: Session,tag:str):
    if tag=='all':
        events=db.query(Todo_Event).all()
    else:
        events = db.query(Todo_Event).filter(Todo_Event.tag==tag).all()
    return [event_to_dict(e) for e in events]

#新建任务
def create_event(db: Session, title: str, tag: str, end_time: datetime):
    if isinstance(end_time, str):
        try:
            end_time = datetime.fromisoformat(end_time)
        except Exception:
            pass
    event = Todo_Event(title=title, tag=tag, end_time=end_time)
    db.add(event)
    db.commit()
    db.refresh(event)
    return event_to_dict(event)
