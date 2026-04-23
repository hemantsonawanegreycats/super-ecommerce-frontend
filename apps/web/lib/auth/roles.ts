/**
 * Super-E Platform Roles and Permissions
 */
export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  CUSTOMER = "CUSTOMER",
  GUEST = "GUEST",
}

export const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.SUPER_ADMIN]: 100,
  [Role.ADMIN]: 80,
  [Role.VENDOR]: 50,
  [Role.CUSTOMER]: 10,
  [Role.GUEST]: 0,
};

/**
 * Check if a user's role satisfies the required minimum role level
 */
export function hasRole(currentRole: Role | string | undefined | null, requiredRole: Role): boolean {
  if (!currentRole) return false;
  
  const currentLevel = ROLE_HIERARCHY[currentRole as Role] ?? 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole];

  return currentLevel >= requiredLevel;
}
