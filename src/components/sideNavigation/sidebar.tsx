import { useState, useEffect, useContext, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useCollection } from "@cloudscape-design/collection-hooks";
import RouterButton from "../wrappers/router-button";
import { ApiClient } from "../../common/api-client/api-client";
import { SessionsClient } from "../../common/api-client/sessions-client";
import { SessionsProps } from "../chatbot/sessions";
import { BreadcrumbGroup } from "@cloudscape-design/components";
// add in import for the API client 
// import { listSessionsByUserId } from '.lambda whatever' 
import { AppContext } from "../../common/app-context";

export default function SidebarSessions() {
    const appContext = useContext(AppContext);
    const[sessions, setSessions] = useState([]);
    const apiClient = new ApiClient(); 
    // const [session, setSession] = useState<{ id: string; loading: boolean }>({
    //     id: props.sessionId ?? uuidv4(),
    //     loading: typeof props.sessionId !== "undefined",
    //   });

    const Sidebar = () => {
    
    }; 

    return (
        <BreadcrumbGroup 
        items={[]}>
        
        
        </BreadcrumbGroup>
    );


}


