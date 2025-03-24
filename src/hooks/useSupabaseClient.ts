import { useMemo } from "react";
import supabase from "../client";

function useClient(){
    return useMemo(supabase, []);
}
export default useClient;