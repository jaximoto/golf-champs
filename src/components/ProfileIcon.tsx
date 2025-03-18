import { useEffect, useState } from "react";
import supabase from "../client";
import golferIcon from "../assets/images/icons/golfer.png"
import clubhouseIcon from "../assets/images/icons/clubhouse.png"
import defaultIcon from "../assets/images/icons/golf.png";

function ProfileIcon() {
    const glfIcon = golferIcon;
    const clbshsIcon = clubhouseIcon;
    const dfltIcon = defaultIcon;

    const [first_name, setFirst_Name] = useState("friend")
    const [role, setRole] = useState("");
    const [icon, setIcon] = useState(dfltIcon);


    useEffect(() => {
        const UpdateIcon = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {

            } else {
                const {data, error: roleError} = await supabase
                    
                    .from("profile")
                    .select("role")
                    .eq("id", user.id)
                    .single();
                if (roleError || !data){
                    console.error("error fetching role:", roleError.message)
                    return;
                }
                setRole(data.role) 

                if (role === "Golfer"){
                    setIcon(glfIcon);
                }
                else if (role === "Clubhouse"){
                    setIcon(clbshsIcon);
                }
            }
        }
        const UpdateName = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {

            } else {
                const {data, error: nameError} = await supabase
                    .from("profile")
                    .select("first_name")
                    .eq("id", user.id)
                    .single();
                if (nameError || !data){
                    console.error("error fetching name:", nameError.message)
                    return;
                }
                setFirst_Name(data.first_name)      
            }
        }

        UpdateIcon();
        UpdateName();
    });



    return(
        <a className="navbar-brand">
            <img src = {icon} width = '30' height='30' className="d-inline-block align-top mx-3" alt=''></img>
            Welcome {first_name}
        </a>


    );
};
export default ProfileIcon;

