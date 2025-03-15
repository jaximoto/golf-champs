import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
interface Props{
    children : React.ReactNode;
    requiredRole? : string;
}
const ProtectedRoute = ({children, requiredRole} : Props) => {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                navigate("/login");  // Redirect to login if not authenticated
            } else {
                // if no error and we got a user, check what their role is
                const {data, error: roleError} = await supabase
                    .from("profile")
                    .select("role")
                    .eq("id", user.id)
                    .single();
                if (roleError || !data){
                    console.error("Error fetching role:", roleError.message);
                    navigate("/login");
                    return;
                }
                setRole(data.role);
                setLoading(false);
                
                
                
            }
        };

        checkAuth();
    }, [navigate]);

    // Check if user has the required role AFTER loading
    useEffect(() => {
        if (!loading && requiredRole && role !== requiredRole) {
            navigate("/unauthorized"); // Redirect if user lacks permission
        }
        /*
        if we need it to include multiple roles and make required roles an array
        if (!loading && requiredRole && !requiredRole.includes(role)) {
            navigate("/unauthorized"); // Redirect if user lacks any required role
        }
        */


        
    }, [role, loading, requiredRole, navigate]);

    if (loading) return <p>Loading...</p>; // Show loading while fetching auth

    return <>{children}</>;
    
};

export default ProtectedRoute;
