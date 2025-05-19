import { EmpleadoIcon } from "@/components/icons/EmpleadoIcon";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { InstitucionIcon } from "@/components/icons/InstitucionIcon";
import { PresentacionIcono } from "@/components/icons/PresentacionIcono";
import { ROUTES } from "@/routes";

export const menuItems = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Presentaciones",
    icon: <PresentacionIcono />,
    submenu: [{ name: "Sueldo", path: "/sueldo" }],
  },
  {
    name: "Instituciones",
    icon: <InstitucionIcon />,
    submenu: [
      { name: "Empleados", path: ROUTES.EMPLEADOS.LIST },
      { name: "Usuarios", path: ROUTES.USUARIOS.LIST },
    ],
  },
];
