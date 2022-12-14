import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { lazy, Suspense } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {},
  },
});

const Dashboard = lazy(() => import("./components/Dashboard"));

const TeachersPage = lazy(() =>
  import("./features/Teacher/TeachersPage").then((mod) => ({
    default: mod.TeachersPage,
  }))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <Dashboard />
      </Suspense>
    ),
    children: [
      {
        path: "/teachers",
        element: (
          <Suspense>
            <TeachersPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <CssBaseline />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
