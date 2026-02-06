export type UserRole = "admin" | "user" | "moderator";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
