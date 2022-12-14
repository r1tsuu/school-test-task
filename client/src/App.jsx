import {
  useRoutes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { lazy } from "react";

const queryClient = new QueryClient();

const Dashboard = lazy(() =>
  import("./components//Dashboard").then((mod) => ({
    default: mod.Dashboard,
  }))
);

const TeachersPage = lazy(() =>
  import("./features/Teacher/TeachersPage").then((mod) => ({
    default: mod.TeachersPage,
  }))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/teachers",
        element: <TeachersPage />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
