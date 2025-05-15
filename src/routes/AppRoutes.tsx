import { Route } from "react-router";
import { ErrorComponent } from "@refinedev/core";
import {
  EmpleadosCreate,
  EmpleadosEdit,
  EmpleadosList,
  EmpleadosShow,
} from "../pages/empleados";
import { NavigateToResource } from "@refinedev/react-router";
import { InstitucionesList } from "../pages/instituciones/List";

export function AppRoutes() {
  return (
    <>
      <Route index element={<NavigateToResource resource="/" />} />
      <Route path="/empleados">
        <Route index element={<EmpleadosList />} />
        <Route path="create" element={<EmpleadosCreate />} />
        <Route path="edit/:id" element={<EmpleadosEdit />} />
        <Route path="show/:id" element={<EmpleadosShow />} />
      </Route>
      <Route path="/instituciones">
        <Route index element={<InstitucionesList />} />
      </Route>
      <Route path="*" element={<ErrorComponent />} />
    </>
  );
}
