import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css"; // default style
import { Dashboard } from "./Pages/Dashboard";
import { LoginForm } from "./Pages/Login";
import { Layout } from "./Layout";
import { Profileinfo } from "./Component/UserInfo/Userinfo";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./Component/Route_Protect/Protected_Route";
import { AddProduct } from "./Pages/Product/AddProduct";
import { EditProduct } from "./Pages/Product/EditProduct";
import { SellerRegistration } from "./Pages/Register";
import { SellerSetPassword } from "./Pages/SellerSetPassword";
import { SellerView } from "./Pages/Sellerview";
import { PasswordChange } from "./Component/UserInfo/ChangePassword";
import OrderList from "./Pages/OrderList";
import { ListProducts } from "./Pages/Product/ListProduct";
import { SellerOrderDetails } from "./Pages/Orderdetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/seller/register",
      children: [{ index: true, element: <SellerRegistration /> }],
    },
    {
      path: "/seller/GenratePassword/",
      children: [{ index: true, element: <SellerSetPassword /> }],
    },
    {
      path: "/seller/",
      children: [{ index: true, element: <LoginForm /> }],
    },

    {
      path: "/seller/view",
      children: [{ index: true, element: <SellerView /> }],
    },

    // 🔒 Protected seller routes
    {
      path: "/seller",
      element: <ProtectedRoute />,
      children: [
        {
          path: "userinfo",
          element: <Layout />,
          children: [
            { index: true, element: <Profileinfo /> },

            { path: "changedPassword", element: <PasswordChange /> },
          ],
        },
        {
          path: "Dashboard",
          element: <Layout />,
          children: [{ path: "home", element: <Dashboard /> }],
        },

        {
          path: "",
          element: <Layout />,
          children: [
            { path: "AddProduct", element: <AddProduct /> },

            { path: "product/edit/:productId", element: <EditProduct /> },

            { path: "ListProduct", element: <ListProducts /> },
          ],
        },
        {
          path: "Order",
          element: <Layout />,
          children: [
            { path: "OrderList", element: <OrderList /> },
            { path: "OrderList/:orderId", element: <SellerOrderDetails /> },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
