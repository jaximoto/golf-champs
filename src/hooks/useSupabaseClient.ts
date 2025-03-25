import { useMemo } from "react";
import getSupabaseClient from "../client";

function useClient(){
    return useMemo(getSupabaseClient, []);
}
export default useClient;