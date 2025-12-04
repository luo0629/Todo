from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import todo
from .database.db import Base, engine
from .models import event  # 导入模型以注册到 Base

# 创建所有表
Base.metadata.create_all(bind=engine)

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_origin_regex=r"https?://localhost:5173|https?://127\.0\.0\.1:5173",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(todo.todo_router,prefix='/todo')
