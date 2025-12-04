from sqlalchemy import Column, Integer, DateTime, String, Boolean
from ..database.db import Base
from datetime import datetime


class Todo_Event(Base):
    __tablename__='event'
    id=Column(Integer,primary_key=True)
    #标题
    title=Column(String,nullable=False)
    #类型
    tag=Column(String,nullable=False)
    #创建时间
    created_time=Column(DateTime,default=datetime.now)
    #截止时间
    end_time=Column(DateTime,nullable=False)
    #是否完成
    isCompleted=Column(Boolean,default=False)





