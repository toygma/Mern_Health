export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone:string;
  image: [
    {
      public_id: string;
      url: string;
    }
  ];
  paid:"paid" | "no paid";
  role: "admin" | "doctor" | "patient";
}


export interface IAppointment {
  _id: string;
  user: IUser;
  date: string | Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paid:"noPaid" | "paid";
  reason: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
}

export type FilterStatus = "all" | "pending" | "confirmed" | "cancelled" | "completed";