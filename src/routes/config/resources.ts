import { ROUTES } from "@/routes/config/constants";
import { ResourceProps } from "@refinedev/core";

export const resources: ResourceProps[] = [
  {
    name: "empleados",
    list: ROUTES.EMPLEADOS.LIST,
    create: ROUTES.EMPLEADOS.CREATE,
    edit: ROUTES.EMPLEADOS.EDIT,
    show: ROUTES.EMPLEADOS.SHOW,
    meta: { canDelete: true, label: "Empleados" },
  },
];
