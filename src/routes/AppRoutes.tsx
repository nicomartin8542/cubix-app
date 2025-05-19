import { Route } from "react-router";
import { ErrorComponent } from "@refinedev/core";
import {
  EmpleadosCreate,
  EmpleadosEdit,
  EmpleadosList,
  EmpleadosShow,
} from "../pages/empleados";
import { UsuariosList } from "../pages/usuarios/list";
import { UsuariosCreate } from "../pages/usuarios/create";
import { UsuariosEdit } from "../pages/usuarios/edit";
import { UsuariosShow } from "../pages/usuarios/show";
import { Home } from "@/pages/home/Index";
import { ROUTES } from "./config/constants";

export function AppRoutes() {
  return (
    <>
      <Route index path="/" element={<Home />} />
      <Route path={ROUTES.EMPLEADOS.LIST}>
        <Route index element={<EmpleadosList />} />
        <Route path={ROUTES.EMPLEADOS.CREATE} element={<EmpleadosCreate />} />
        <Route path={ROUTES.EMPLEADOS.EDIT} element={<EmpleadosEdit />} />
        <Route path={ROUTES.EMPLEADOS.SHOW} element={<EmpleadosShow />} />
      </Route>
      <Route path={ROUTES.USUARIOS.LIST}>
        <Route index element={<UsuariosList />} />
        <Route path={ROUTES.USUARIOS.CREATE} element={<UsuariosCreate />} />
        <Route path={ROUTES.USUARIOS.EDIT} element={<UsuariosEdit />} />
        <Route path={ROUTES.USUARIOS.SHOW} element={<UsuariosShow />} />
      </Route>
      <Route path="*" element={<ErrorComponent />} />
    </>
  );
}
