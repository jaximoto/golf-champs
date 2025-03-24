import { Client } from "../client";

export function getProfileByID(client: Client, userID:string){
    
    return client
    .from("profile")
    .select("role")
    .eq("id", userID)
    .throwOnError()
    .single();
}