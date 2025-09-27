export interface Trip {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  members: Member[];
  expenses: Expense[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  totalPaid: number;
  totalOwed: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // member id
  category: string;
  date: string;
  splitAmong: string[]; // member ids
  receipt?: string; // receipt image URL
}

export interface Settlement {
  from: string; // member id
  to: string; // member id
  amount: number;
}