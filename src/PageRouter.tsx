import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { ROUTES } from "./app/enums";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import CreateMovie from "./pages/CreateMovie/CreateMovie";
import Layout from "./app/Layout";
import Login from "./pages/Login/Login";

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.MOVIE_DETAILS,
    element: (
      <Layout>
        <MovieDetails />
      </Layout>
    ),
  },
  {
    path: ROUTES.CREATE_MOVIE,
    element: (
      <Layout>
        <CreateMovie />
      </Layout>
    ),
  },
];

function PageRouter() {
  const router = createBrowserRouter(routes);
  return <RouterProvider fallbackElement={<>Loading...</>} router={router} />;
}

export default PageRouter;
