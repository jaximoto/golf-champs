import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
interface Props{
    children : React.ReactNode;
    requiredRole : number;
}
const ProtectedRoute = ({children, requiredRole} : Props) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                navigate("/login");  // Redirect to login if not authenticated
            } else {
                
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) return <p>Loading...</p>;  // Show loading state while checking auth

    return <>{children}</>;
};

export default ProtectedRoute;
