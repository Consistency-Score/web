export default interface User {
  id: number;
  username: string;
  email: string;
  password_digest: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  headline?: string;
  bio?: String;
}
