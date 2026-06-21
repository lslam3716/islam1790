/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  username: string;
  email: string;
  dob: string;
  gender: string;
  bio: string;
  contactNumber: string;
  address: string;
  balance: number; // in USD or BDT
  bdtBalance: number; // in BDT
  activePackageId: string | null;
  profilePic: string;
  isAdmin: boolean;
  registeredAt: string;
}

export interface Task {
  id: string;
  title: string;
  videoUrl: string;
  rewardUSD: number; // 0.50$
  rewardBDT: number; // 60 TK
  thumbnail: string;
  durationSeconds: number;
}

export interface UserTaskLogs {
  [taskId: string]: string; // ISO string of last completed date
}

export interface LevelPackage {
  id: string;
  name: string;
  priceBDT: number;
  dailyTasksCount: number;
  validityDays: number;
  description: string;
  color: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userEmail: string;
  username: string;
  type: 'deposit' | 'withdraw';
  amountBDT: number;
  method: 'bkash' | 'rocket';
  number: string;
  transactionId?: string; // for deposits
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface WorkerPerson {
  id: string;
  name: string;
  contactGmail: string;
  profilePic: string;
  address: string;
  totalEarningsBDT: number;
  joinedDate: string;
  role: string;
}
