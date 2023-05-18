import { useParams } from "react-router";
import NavigationNavBar from "../../Component/navbar/NavigationNavBar";
import { getTab } from "../../api/tab";
import { useEffect, useState } from "react";

export const Tab = ()=>{
        const {tab_id, project_id} = useParams();
        const [tab, setTab]=useState();

        useEffect(()=>{
                getTab(project_id, tab_id).then((data)=>{
                        console.log(data);
                        setTab(data);
                })
        },[])

        return (
                <>
                        <NavigationNavBar />

                </>
        );
}