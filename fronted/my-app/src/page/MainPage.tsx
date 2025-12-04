import React from "react"
import { Outlet } from "react-router";
import Bar from "../component/bar";


const MainPage:React.FC=()=>{

    return(
            <div style={{ paddingBottom: "60px",maxWidth: "800px", margin: "0 auto", minHeight: "100vh", position: "relative" }}>
                <Outlet/>
                <Bar />
            </div>
    )
}
export default MainPage;