import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user }, error } = await client.auth.getUser();

            if (error || !user) {
                navigate("/login");  // Redirect to login if not authenticated
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
                   */
               
               if (!role && role != undefined &&  requiredRole != undefined){
                   if (role != requiredRole)
                       navigate("/unauthorized");
               }
        };
        redirectCheck();
     }, [role, isError, error, navigate, requiredRole]); 
        
        
    
     
    
    return <>{children}</>;
        
};

export default ProtectedRoute;
