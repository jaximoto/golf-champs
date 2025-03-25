import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


interface Props{
    children: React.ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryClientProvider = ({children} : Props) => {
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
export default ReactQueryClientProvider;