import type { StockItem, CalculatedItem } from '../types/stock';

export function calculateItem(item: StockItem): CalculatedItem {
  const numA = item.broughtForward === '' ? 0 : Number(item.broughtForward);
  const numB = item.added === '' ? 0 : Number(item.added);
  const numOpenFront = item.openFront === '' ? 0 : Number(item.openFront);
  const numOpenBack = item.openBack === '' ? 0 : Number(item.openBack);
  const numCloseFront = item.closeFront === '' ? 0 : Number(item.closeFront);
  const numCloseBack = item.closeBack === '' ? 0 : Number(item.closeBack);

  // (C) รวมร้านเปิด = หน้าร้าน + หลังร้าน
  const totalOpen = numOpenFront + numOpenBack;

  // (D) คงเหลือร้านปิด = หน้าร้าน + หลังร้าน
  const totalClose = numCloseFront + numCloseBack;

  // (E) ขาย = (C) - (D)
  const sold = totalOpen - totalClose;

  // Validation: (A) + (B)
  const expectedOpen = numA + numB;

  // Trigger discrepancy if there is input in (A, B) or (C) and they don't match
  const hasInputInStock = item.broughtForward !== '' || item.added !== '';
  const hasInputInOpen = item.openFront !== '' || item.openBack !== '';

  const isDiscrepancy = (hasInputInStock || hasInputInOpen) && expectedOpen !== totalOpen;
  const discrepancyDiff = totalOpen - expectedOpen;

  return {
    ...item,
    totalOpen,
    totalClose,
    sold,
    expectedOpen,
    isDiscrepancy,
    discrepancyDiff,
  };
}

export function shiftToNextDay(items: StockItem[]): StockItem[] {
  return items.map((item) => {
    const numCloseFront = item.closeFront === '' ? 0 : Number(item.closeFront);
    const numCloseBack = item.closeBack === '' ? 0 : Number(item.closeBack);
    const totalClose = numCloseFront + numCloseBack;

    return {
      ...item,
      broughtForward: totalClose, // (D) คงเหลือร้านปิด -> (A) ยอดยกมา
      added: '',                  // ล้างค่า (Clear)
      openFront: '',              // ล้างค่า (Clear)
      openBack: '',               // ล้างค่า (Clear)
      closeFront: '',             // ล้างค่า (Clear)
      closeBack: '',              // ล้างค่า (Clear)
      remark: '',                 // ล้างค่า (Clear)
    };
  });
}

export interface StockSummary {
  totalItems: number;
  totalBroughtForward: number;
  totalAdded: number;
  totalOpen: number;
  totalClose: number;
  totalSold: number;
  discrepancyCount: number;
}

export function calculateSummary(calculatedItems: CalculatedItem[]): StockSummary {
  return calculatedItems.reduce<StockSummary>(
    (acc, curr) => {
      const numA = curr.broughtForward === '' ? 0 : Number(curr.broughtForward);
      const numB = curr.added === '' ? 0 : Number(curr.added);
      return {
        totalItems: acc.totalItems + 1,
        totalBroughtForward: acc.totalBroughtForward + numA,
        totalAdded: acc.totalAdded + numB,
        totalOpen: acc.totalOpen + curr.totalOpen,
        totalClose: acc.totalClose + curr.totalClose,
        totalSold: acc.totalSold + curr.sold,
        discrepancyCount: acc.discrepancyCount + (curr.isDiscrepancy ? 1 : 0),
      };
    },
    {
      totalItems: 0,
      totalBroughtForward: 0,
      totalAdded: 0,
      totalOpen: 0,
      totalClose: 0,
      totalSold: 0,
      discrepancyCount: 0,
    }
  );
}
