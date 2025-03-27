import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useClient from "../hooks/useSupabaseClient";
import { getRoleByID } from "../queries/getRoleByUserID";
import getSupabaseClient from "../client";


interface Props{
    children : React.ReactNode;
    requiredRole? : string;
}
const ProtectedRoute = ({children, requiredRole} : Props) => {
    const [userId, setUserId] = useState<string>("");
    const navigate = useNavigate();
    const client = useClient();
    
    // Maybe get the user and pass it down to this function somehow, or get it somewhere else so this component can wait on it?
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user }, error } = await client.auth.getUser();

            if (error || !user) {
                throw redirect("login");
            } else {
               setUserId(user.id)
                
                
                
            }
        };

        checkAuth();
    }, []);

    
     // if no error and we got a user, check what their role is
    const {data: role, isLoading, isError, error} = useQuery(
        getRoleByID(client, userId), 
       {
           enabled: !!userId,
       });
    /*
     useEffect(() => {
        const redirectCheck = () => {
            
               if (error || !role){
                   console.error("Error fetching role: ", error?.message);
                   navigate("/login");
                   //return;
               }
               
               /*
               if (isLoading) {
                   return <div>Loading...</div>;
                 }
                   
               
               if (!role && role != undefined &&  requiredRole != undefined){
                   if (role != requiredRole)
                       navigate("/unauthorized");
               }
        };
        redirectCheck();
     }, []); 
     */
     if (error || !role){
        console.error("Error fetching role: ", error?.message);
        navigate("/login");
        //return;
    }
    
    
    
        
    
    if (!role && role != undefined &&  requiredRole != undefined){
        if (role != requiredRole)
            navigate("/unauthorized");
    }
        
        
    
     
    
    return <>{children}</>;
        
};

export default ProtectedRoute;
