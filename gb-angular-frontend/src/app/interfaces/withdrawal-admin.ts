export interface WithdrawalAdmin {
  withdrawal_id: number;
  user_id: number;
  username: string;
  email: string;
  holder_name: string;
  account_number: string;
  bank_name: string;
  branch_name: string;
  approval_date: string;
  request_date: string;
  amount: number;
  payment_date: string;
  status: string;
}
