export type ItemCategory = 'liquor' | 'beer' | 'mixer' | 'other';

export interface StockItem {
  id: string;
  no: number;
  name: string;
  category: ItemCategory;
  unit: string;
  broughtForward: number | ''; // (A) ยอดยกมา
  added: number | '';          // (B) สั่งเพิ่ม
  openFront: number | '';      // (C) รวมร้านเปิด - หน้าร้าน
  openBack: number | '';       // (C) รวมร้านเปิด - หลังร้าน
  closeFront: number | '';     // (D) คงเหลือร้านปิด - หน้าร้าน
  closeBack: number | '';      // (D) คงเหลือร้านปิด - หลังร้าน
  remark: string;              // หมายเหตุ
}

export interface CalculatedItem extends StockItem {
  totalOpen: number;           // (C) = openFront + openBack
  totalClose: number;          // (D) = closeFront + closeBack
  sold: number;                // (E) = (C) - (D)
  expectedOpen: number;        // (A) + (B)
  isDiscrepancy: boolean;      // True if (A + B) !== C and at least one field has data
  discrepancyDiff: number;     // C - (A + B)
}

export interface DailySnapshot {
  id: string;
  date: string;
  timestamp: number;
  note?: string;
  totalSold: number;
  items: CalculatedItem[];
}
