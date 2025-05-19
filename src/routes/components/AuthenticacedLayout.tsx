// components/AuthenticatedLayout.tsx
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate } from "@refinedev/react-router";
import { Outlet } from "react-router-dom";
import { Layout } from "@/layout";
import { ROUTES } from "@/routes/config/constants";

export const AuthenticatedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Authenticated
    key="authenticated-inner"
    fallback={<CatchAllNavigate to={ROUTES.LOGIN} />}
  >
    <Layout>
      <Outlet />
      {children}
    </Layout>
  </Authenticated>
);
