import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./UI/Home";
import Error from "./UI/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import { action as UpdateOrderAction } from "./features/order/UpdateOrder";
import AppLayout from "./UI/AppLayout";
//  The routing setup
/*
- This "createBrowserRouter" function creates a router using the browser's history API. It enables navigation between routes without full-page reloads.
- It takes an array of route objects that define the paths, associated components, loaders, and actions.


Top-Level Route
{
  element: <AppLayout />,
  errorElement: <Error />,
  children: [ ... ]
}
-- <AppLayout /> - Acts as a layout structure for the app
-- <Error /> - If any error occurs at this level(at that route) (e.g., during navigation or data fetching failure), the Error component is rendered
-- loader: A function that fetches or prepares data before rendering the component meaning, it is executed before rendering the component. This ensures the component has necessary data on initial load. The data returned by the loader is passed to the component via the useLoaderData hook
-- action: A function that handles mutations like form submissions or user interactions. When a form is submitted, the corresponding route’s action is called by passing in the request and params obj

*/
const router = createHashRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: UpdateOrderAction,
      },
    ],
  },
]);
function App() {
  // Connects the router to the application.
  return <RouterProvider router={router} />;
}

export default App;
