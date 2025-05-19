export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  UPDATE_PASSWORD: "/update-password",
  EMPLEADOS: {
    LIST: "/empleados",
    CREATE: "/empleados/create",
    EDIT: "/empleados/edit/:id",
    SHOW: "/empleados/show/:id",
  },
  INSTITUCIONES: {
    LIST: "/instituciones",
  },
  UNAUTHORIZED: "/unauthorized",
} as const;
