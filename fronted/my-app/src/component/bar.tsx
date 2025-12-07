import React from "react";
import { useNavigate, useLocation } from "react-router";

const Bar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getIconColor = (isActive: boolean) => isActive ? "#1677ff" : "#666";
    const getTextColor = (isActive: boolean) => isActive ? "#1677ff" : "#666";

    const menuItems = [
        {
            key: "home",
            label: "任务",
            path: "/home",
            icon: (active: boolean) => (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 6H21" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H21" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 18H21" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 6H3.01" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12H3.01" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 18H3.01" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            key: "classify",
            label: "分类",
            path: "/classify",
            icon: (active: boolean) => (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3H10V10H3V3Z" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 3H21V10H14V3Z" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 14H21V21H14V14Z" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 14H10V21H3V14Z" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            key: "count",
            label: "统计",
            path: "/count",
            icon: (active: boolean) => (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 20V10" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 20V4" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 20V14" stroke={getIconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        }
    ];

    return (
        <div style={{
            display: "flex",
            width: "100%",
            height: "56px",
            backgroundColor: "#ffffff",
            borderTop: "1px solid #e0e0e0",
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "800px",
            zIndex: 1000,
            boxShadow: "0 8px 12px rgba(0,0,0,0.05)",
            paddingBottom: "safe-area-inset-bottom" // Support for iPhone X+
        }}>
            {menuItems.map((item) => {
                // Check exact match or sub-path
                const isActive = location.pathname.startsWith(item.path);
                return (
                    <div 
                        key={item.key}
                        onClick={() => navigate(item.path)}
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            userSelect: "none",
                            transition: "all 0.2s ease"
                        }}
                    >
                        {item.icon(isActive)}
                        <span style={{ 
                            fontSize: "11px", 
                            marginTop: "2px",
                            color: getTextColor(isActive),
                            fontWeight: isActive ? 600 : 400
                        }}>
                            {item.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default Bar;
