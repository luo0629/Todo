import React, { useState } from "react"
import { FloatButton, Modal } from 'antd';
import NewEvent from "./homePage/newEvent";
import { PlusOutlined } from '@ant-design/icons';

const PageHead: React.FC<{ title: string }> = ({ title }) => {
    const [showNewEvent, setShowNewEvent] = useState(false);

    return (
        <div>
            <div style={{ margin: "40px  auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "30px", fontWeight: "bold", marginLeft: 20 }}>{title}</div>
                <FloatButton
                    icon={<PlusOutlined />}
                    type="primary"
                    style={{ position: 'static', marginRight: 20 }}
                    onClick={() => setShowNewEvent(true)}
                />
            </div>
            <Modal
                open={showNewEvent}
                title="新建任务"
                footer={null}
                centered
                onCancel={() => setShowNewEvent(false)}
            >
                <NewEvent onSuccess={() => setShowNewEvent(false)} />
            </Modal>
        </div>
    )
}
export default PageHead;
