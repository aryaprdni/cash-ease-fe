export interface User {
  id: string;
  name: string;
  bank: string;
  bankImg: string;
  balance: number;
  sender_name?: string;
  receiver_name?: string;
  amount?: number;
  account_number?: string;
  created_at: string;
}

export interface AllUsers {
  users: User[];
  totalBalance: number;
  totalUsers: number;
}
