import type { Event } from '../../type/todo';
import React ,{useState,useEffect}from 'react';
import { todoApi } from '../../api/todoApi';
import { useTodoStore } from '../../store/todoStore';

const EventList:React.FC<{ data: Event[]; label: string }> = ({ data, label }) => {
    const [events, setEvents] = useState(data);
    const [isExpanded, setIsExpanded] = useState(true);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const refreshEvents=useTodoStore(state=>state.refreshEvents);
    useEffect(()=>{
        setEvents(data);
    },[data])

    const getTagStyle = (tag: string) => {
        const t = tag.trim();
        if (t === 'work') return { bg: '#E6F0FF', fg: '#4B89FF' };
        if (t === 'life') return { bg: '#EAF7EE', fg: '#30A46C' };
        if (t === 'study') return { bg: '#F0E7FF', fg: '#7C4DFF' };
        return { bg: '#F1F3F5', fg: '#666' };
    };

    //更新任务状态
    const toggleComplete = async(id: number) => {
        try{
            await todoApi.updateStateById(id);
            await refreshEvents();
        }catch(err){
            console.log(err);
        }
    };

    //删除任务
    const handleDelete = async(id: number, e: React.MouseEvent) => {
        e.stopPropagation(); // 阻止事件冒泡，避免触发 toggleComplete
        if (window.confirm('确定要删除这个任务吗？')) {
            try{
                await todoApi.deleteEvent(id);
                await refreshEvents();
            }catch(err){
                console.log(err);
            }
        }
    };

    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 8px 12px rgba(0,0,0,0.05)',
            margin: '16px',
            transition: 'all 0.3s ease'
        }}>
            <div 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    marginBottom: isExpanded ? '16px' : '0'
                }}
            >
                <h1 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#333',
                    margin: '0',
                    textAlign: 'left'
                }}>{label} ({events.length})</h1>
                
                <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                    }}
                >
                    <path 
                        d="M5 7.5L10 12.5L15 7.5" 
                        stroke="#666" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {isExpanded && (
                events.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '10px 20px',
                        color: '#999',
                        fontSize: '20px',
                        fontWeight:'bolder'
                    }}>
                        无任务
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {events.map((event) => (
                    <div key={event.id}>
                        <div
                            onClick={() => toggleComplete(event.id)}
                            onMouseEnter={() => setHoveredId(event.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin:'10px auto',
                                gap: '12px',
                                cursor: 'pointer',
                                position: 'relative',
                                padding: '8px',
                                borderRadius: '8px',
                                transition: 'background-color 0.2s ease',
                                backgroundColor: hoveredId === event.id ? '#F8F9FA' : 'transparent'
                            }}>
                            {/* Checkbox */}
                            <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                border: event.isCompleted ? 'none' : '2px solid #4B89FF',
                                backgroundColor: event.isCompleted ? '#4B89FF' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                cursor: 'pointer'

                            }}>
                                {event.isCompleted && (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                                <span style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: event.isCompleted ? '#999' : '#333',
                                    textDecoration: event.isCompleted ? 'line-through' : 'none'
                                }}>
                                    {event.title}
                                </span>
                            </div>

                            {/* Tag */}
                            <div style={{
                                padding: '4px 12px',
                                borderRadius: '16px',
                                backgroundColor: getTagStyle(event.tag).bg,
                                color: getTagStyle(event.tag).fg,
                                fontSize: '12px',
                                fontWeight: '500',
                                flexShrink: 0
                            }}>
                                {event.tag === 'work' ? '工作' : event.tag === 'life' ? '生活' : '学习'}
                            </div>

                            {/* Delete Button - 悬停时显示 */}
                            <div 
                                onClick={(e) => handleDelete(event.id, e)}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    opacity: hoveredId === event.id ? 1 : 0,
                                    transition: 'opacity 0.2s ease, background-color 0.2s ease',
                                    backgroundColor: 'transparent',
                                    flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.backgroundColor = '#FFE5E5';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 4H14M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2 6 1.33333 6.66667 1.33333H9.33333C10 1.33333 10.6667 2 10.6667 2.66667V4M6.66667 7.33333V11.3333M9.33333 7.33333V11.3333" 
                                        stroke="#FF4444" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div style={{
                            fontSize: '13px',
                            color: event.isCompleted ? '#999' : '#666'
                        }}>{event.end_time}</div>
                    </div>
                    ))}
                </div>
                )
            )}
        </div>
    );
};

export default EventList;
