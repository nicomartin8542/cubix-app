// components/AuthenticatedLayout.tsx
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate } from "@refinedev/react-router";
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
    {children}
  </Authenticated>
);
