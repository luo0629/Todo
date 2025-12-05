from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EventCreate(BaseModel):
    """创建任务的请求模型"""
    title: str
    tag: str
    end_time: datetime

class EventResponse(BaseModel):
    """任务响应模型"""
    id: int
    title: str
    tag: str
    created_time: Optional[str]
    end_time: Optional[str]
    isCompleted: bool

    class Config:
        from_attributes = True  # 允许从 ORM 模型创建
        
    @classmethod
    def from_orm_model(cls, event):
        """从 ORM 模型转换"""
        return cls(
            id=event.id,
            title=event.title,
            tag=event.tag,
            created_time=event.created_time.isoformat() if event.created_time else None,
            end_time=event.end_time.isoformat() if event.end_time else None,
            isCompleted=bool(event.isCompleted)
        )