import "./App.css";
import AddProductForm from "./components/vendors/AddProductForm";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import VendorProducts from "./components/vendors/Products";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./components/customers/Root.tsx";
import Cart from "./components/customers/Cart/Cart.tsx";
import Checkout from "./components/customers/Checkout.tsx";
import ProductList from "./components/customers/Product/ProductList.tsx";
import VendorRoot from "./components/vendors/VendorRoot.tsx";

const router = createBrowserRouter([
  {
    path: "/customer",
    element: <Root />,
    children: [
      {
        path: "",
        element: <ProductList />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/vendor",
    element: <VendorRoot />,
    children: [
      {
        path: "",
        element: (
          <div>
            <AddProductForm />
            <VendorProducts />
          </div>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
