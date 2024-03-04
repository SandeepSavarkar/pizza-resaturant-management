import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/home"
import Orders from "../pages/orders"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
])
