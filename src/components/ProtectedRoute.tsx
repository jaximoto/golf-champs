import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useClient from "../hooks/useSupabaseClient";
import { getRoleByID } from "../queries/getRoleByUserID";


interface Props{
    children : React.ReactNode;
    requiredRole : string | null;
}
const ProtectedRoute = ({children, requiredRole} : Props) => {
    const [userId, setUserId] = useState<string | null>(null);
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
    }, [client, navigate]);

     // if no error and we got a user, check what their role is
     if (userId){
        const {data: role, isLoading, isError, error} = useQuery(getRoleByID(client, userId));
        if (isError || !role){
            console.error("Error fetching role: ", error?.message);
            navigate("/login");
            return;
        }
        if (isLoading) {
            return <div>Loading...</div>;
          }
        
        if (!role && requiredRole != null){
            if (role != requiredRole)
                navigate("/unauthorized");
        }
        
     }
     

    return <>{children}</>;
    
};

export default ProtectedRoute;
