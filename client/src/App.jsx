import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
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

const Dashboard = lazy(() =>
  import("./components/Dashboard").then((mod) => ({
    default: mod.Dashboard,
  }))
);

const TeachersPage = lazy(() =>
  import("./features/Teacher/TeachersPage").then((mod) => ({
    default: mod.TeachersPage,
  }))
);

const LessonsPage = lazy(() =>
  import("./features/Lesson/LessonsPage").then((mod) => ({
    default: mod.LessonsPage,
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
      {
        path: "/lessons",
        element: (
          <Suspense>
            <LessonsPage />
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
