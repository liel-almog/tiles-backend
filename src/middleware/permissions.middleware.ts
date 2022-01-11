import jwtAuthz from "express-jwt-authz";
import { Role } from "../types/role.enum";

export const checkPermissions = (permissions: Role[]) => {
  return jwtAuthz(permissions, {
    customScopeKey: "role",
    // checkAllScopes: true,
    failWithError: true,
  });
};
