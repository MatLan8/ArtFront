
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: "Client" | "Vendor";
}
