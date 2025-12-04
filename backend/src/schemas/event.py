from pydantic import BaseModel
from datetime import datetime
class EventCreat(BaseModel):
    title:str
    tag:str
    end_time:datetime