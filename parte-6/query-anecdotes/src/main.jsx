import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NoticationContextProvider } from "./context/NotificationContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NoticationContextProvider>
      <App />
    </NoticationContextProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
