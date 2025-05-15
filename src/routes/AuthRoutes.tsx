import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/react-router";
import { Outlet, Route, useNavigate, useLocation } from "react-router";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { UpdatePassword } from "../pages/auth/UpdatePassword";
import { useEffect } from "react";

export const AuthRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let type = "";

  useEffect(() => {
    // Detecta type=recovery en el hash de la URL
    const params = new URLSearchParams(location.hash.replace("#", "?"));
    type = params.get("type") || "";
    const accessToken = params.get("access_token");
    if (type === "recovery") {
      // Redirige a la pantalla de cambio de contraseña
      navigate(`/update-password?access_token=${accessToken}`, {
        replace: true,
      });
    }
  }, [location, navigate]);

  return (
    <>
      <Route
        element={
          <Authenticated key="authenticated-outer" fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Route>
    </>
  );
};
