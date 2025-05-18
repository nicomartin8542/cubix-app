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
