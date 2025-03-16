import { useEffect, useState } from "react";
import supabase from "../client";


function ProfileIcon() {
    const [first_name, setFirst_Name] = useState("friend")
    const [role, setRole] = useState("");


     
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
        <>
            <p>welcome {role} {first_name}</p>
        </>


    );
};
export default ProfileIcon;

