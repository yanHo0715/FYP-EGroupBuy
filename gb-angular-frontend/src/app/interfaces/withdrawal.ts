export interface Withdrawal {
  withdrawal_id: number;
  user_id: number;
  request_date: string;
  approval_date: string;
  amount: number;
  payment_date: string;
  status: string;
}
