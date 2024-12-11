import { createBrowserRouter } from "react-router-dom";
import AllProduct from "./Pages/AllProduct";
import Cart from "./Pages/Cart";
import CheckOut from "./Pages/CheckOut";
import Success from "./Pages/Success";
import Failed from "./Pages/Failed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AllProduct />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/cancel",
    element: <Failed />,
  },
]);
