import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useClient from "./useSupabaseClient";
import { getProfileByID } from "../queries/getProfileByUserID";

const client = useClient;
export function UseProfileQuery(userID:string){
    
    //eturn useQuery(getProfileByID(client, userID));
}