// components/ProtectedRoute.tsx
import { usePermissions } from "@refinedev/core";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../config/constants";

export const ProtectedRoute = ({
  children,
  requiredPermissions = [],
}: {
  children: React.ReactNode;
  requiredPermissions?: string[];
}) => {
  const { data: permissions } = usePermissions<string[]>();
  const location = useLocation();

  const hasPermission = requiredPermissions.every((permission) =>
    permissions?.includes(permission)
  );

  if (!hasPermission) {
    return (
      <Navigate to={ROUTES.UNAUTHORIZED} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};
