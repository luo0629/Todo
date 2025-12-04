import type { Event } from '../type/todo';
import React ,{useState,useEffect}from 'react';

const EventList:React.FC<{ data: Event[]; label: string }> = ({ data, label }) => {
    const [events, setEvents] = useState(data);
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

    const toggleComplete = (id: number) => {
        setEvents(prevEvents => prevEvents.map(event => 
            String(event.id) === String(id) ? { ...event, isCompleted: !event.isCompleted } : event
        ));
    };

    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            margin: '16px'
        }}>
            <h1 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#333',
                margin: '0 0 16px 0',
                textAlign: 'left'
            }}>{label}</h1>

            {events.length === 0 ? (
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
                    <div>
                        <div
                            key={event.id}
                            onClick={() => toggleComplete(event.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin:'10px auto',
                                gap: '12px',
                                cursor: 'pointer'
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
                        </div>
                        <div style={{
                            fontSize: '13px',
                            color: event.isCompleted ? '#999' : '#666'
                        }}>{event.end_time}</div>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
};

export default EventList;
