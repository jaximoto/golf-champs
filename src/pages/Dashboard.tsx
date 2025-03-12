import supabase from "../client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {

  const navigate = useNavigate();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };
  return (

    <div>
      <Navbar/>
      <h1>This is the Dashboard page</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
export default Dashboard;
