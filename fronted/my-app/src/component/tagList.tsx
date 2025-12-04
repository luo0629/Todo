import React,{useState} from "react";
import { Flex, Button } from 'antd';

const TagList:React.FC<{selectedTag:string,handleTagClick:(tag:string)=>void}>=({selectedTag,handleTagClick})=>{

    return(
        <Flex style={{width:"100%",height:"50px",marginLeft:"20px", gap: 8,marginBottom:"20px"}} justify="flex-start" align="center">
            {[
                { label: "全部", value: "all" },
                { label: "工作", value: "work" },
                { label: "生活", value: "life" },
                { label: "学习", value: "study" }
            ].map(item => (
                <Button
                    key={item.value}
                    type={selectedTag === item.value ? "primary" : "default"}
                    onClick={() => handleTagClick(item.value)}
                    style={selectedTag === item.value ? {
                        borderRadius: 20,
                    } : {
                        backgroundColor: "#f5f5f5",
                        color: "#333",
                        borderRadius: 20,
                        border: "1px solid #e0e0e0"
                    }}
                >
                    {item.label}
                </Button>
            ))}
        </Flex>
    )
}

export default TagList;
