import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import ToDoDetails from "./pages/ToDoDetails/ToDoDetails";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "todo/:id", element: <ToDoDetails /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
