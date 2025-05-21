// src/routes/types.ts
export type AppRoute = {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
};

export type RoutesConfig = {
  public: AppRoute[];
  protected: AppRoute[];
};

export type RouteParams = {
  id: string;
};

export type RoutePath =
  | "/"
  | "/login"
  | "/register"
  | "/empleados"
  | "/empleados/create"
  | `/empleados/edit/${string}`
  | `/empleados/show/${string}`
  | "/instituciones";

export interface Identity {
  id: string;
  name: string | null;
  email: string | null;
  institucion_id: string | null;
}
