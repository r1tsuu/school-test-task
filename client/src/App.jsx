import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
            <Navigate to={"/lessons/all"} />
          </Suspense>
        ),
      },
      {
        path: "/lessons/all",
        element: (
          <Suspense>
            <LessonsPage lessonsDisplay="all" />
          </Suspense>
        ),
      },
      {
        path: "/lessons/conducted",
        element: (
          <Suspense>
            <LessonsPage lessonsDisplay="conducted" />
          </Suspense>
        ),
      },
      {
        path: "/lessons/pending",
        element: (
          <Suspense>
            <LessonsPage lessonsDisplay="pending" />
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
