import { Client } from "../client";


export function getRoleByID(client: Client, userID:string){
    
    return client
    .from("profile")
    .select("role")
    .eq("id", userID)
    .throwOnError()
    .single();
}