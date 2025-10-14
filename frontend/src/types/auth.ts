export interface IUser {
  id: string;
  name: string;
  email: string;
  image: [
    {
      public_id: string;
      url: string;
    }
  ];
  role: "admin" | "doctor" | "patient";
}
