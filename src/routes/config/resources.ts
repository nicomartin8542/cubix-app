import { ROUTES } from "@/routes/config/constants";
import { ResourceProps } from "@refinedev/core";

export const resources: ResourceProps[] = [
  {
    name: "home",
    show: ROUTES.HOME,
    meta: { label: "Home" },
  },

  {
    name: "empleados",
    list: ROUTES.EMPLEADOS.LIST,
    create: ROUTES.EMPLEADOS.CREATE,
    edit: ROUTES.EMPLEADOS.EDIT,
    show: ROUTES.EMPLEADOS.SHOW,
    meta: { canDelete: true, label: "Empleados" },
  },

  {
    name: "users",
    list: ROUTES.USUARIOS.LIST,
    create: ROUTES.USUARIOS.CREATE,
    edit: ROUTES.USUARIOS.EDIT,
    show: ROUTES.USUARIOS.SHOW,
    meta: { canDelete: true, label: "Usuarios" },
  },

  {
    name: "account",
    list: ROUTES.ACCOUNT.LIST,
    edit: ROUTES.ACCOUNT.EDIT,
    meta: { label: "Mi Cuenta" },
  },
];
