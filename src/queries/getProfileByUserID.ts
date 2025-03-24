import supabase from "../client";

export function getProfileByID(userID:string){
    
    return supabase
    .from("profile")
    .select("role")
    .eq("id", userID)
    .single();
}