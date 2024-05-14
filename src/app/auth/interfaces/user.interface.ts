export interface User {
  _id:      string;
  admin: number;
  email:    string;
  name:     string;
  isActive: boolean;
  roles:    string[];
  __v:      number;
}
