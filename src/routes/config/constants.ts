export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  UPDATE_PASSWORD: "/update-password",
  EMPLEADOS: {
    LIST: "/app/empleados",
    CREATE: "/app/empleados/create",
    EDIT: "/app/empleados/edit/:id",
    SHOW: "/app/empleados/show/:id",
  },

  USUARIOS: {
    LIST: "/app/usuarios",
    CREATE: "/app/usuarios/create",
    EDIT: "/app/usuarios/edit/:id",
    SHOW: "/app/usuarios/show/:id",
  },

  ACCOUNT: {
    LIST: "/app/account",
    EDIT: "/app/account/edit",
  },

  UNAUTHORIZED: "/unauthorized",
} as const;
