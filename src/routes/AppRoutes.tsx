import { Route } from "react-router";
import { ErrorComponent } from "@refinedev/core";
import {
  EmpleadosCreate,
  EmpleadosEdit,
  EmpleadosList,
  EmpleadosShow,
} from "../pages/empleados";
import { NavigateToResource } from "@refinedev/react-router";

export function AppRoutes() {
  return (
    <>
      <Route index element={<NavigateToResource resource="/" />} />
      <Route path="/">
        <Route index element={<EmpleadosList />} />
        <Route path="create" element={<EmpleadosCreate />} />
        <Route path="edit/:id" element={<EmpleadosEdit />} />
        <Route path="show/:id" element={<EmpleadosShow />} />
      </Route>
      <Route path="*" element={<ErrorComponent />} />
    </>
  );
}
