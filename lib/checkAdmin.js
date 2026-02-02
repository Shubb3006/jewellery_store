// lib/auth.js
import { getUserFromCookie } from "./auth";

export const requireAdmin = async (req) => {
  const user = await getUserFromCookie(req);
  if (!user) throw new Error("Unauthorized");
  if (!user.isAdmin) throw new Error("Admin access required");
  return user;
};
