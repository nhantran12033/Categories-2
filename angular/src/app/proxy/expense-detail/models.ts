
export interface ExpenseDetailDto {
  id?: string;
  item?: string;
  specification?: string;
  originalCurrency?: string;
  originalUnit: number;
  volume: number;
  originalAmount: number;
  equivalentInVND: number;
  notes?: string;
  totalAmount: number;
}
