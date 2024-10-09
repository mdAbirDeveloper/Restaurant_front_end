import "@/styles/globals.css";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }) {
  // Create a client
  const queryClient = new QueryClient();
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
    </QueryClientProvider>
  );
}
