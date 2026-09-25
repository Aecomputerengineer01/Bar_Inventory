import * as XLSX from 'xlsx';
import type { CalculatedItem } from '../types/stock';

export function exportToExcel(items: CalculatedItem[], reportDate: string) {
  const rows = items.map((item) => ({
    'ลำดับ': item.no,
    'รายการ': item.name,
    'หมวดหมู่': item.category === 'liquor' ? 'สุรา/วิสกี้' : item.category === 'beer' ? 'เบียร์' : 'มิกเซอร์/น้ำดื่ม',
    'หน่วย': item.unit,
    '(A) ยอดยกมา': item.broughtForward === '' ? 0 : item.broughtForward,
    '(B) สั่งเพิ่ม': item.added === '' ? 0 : item.added,
    '(C) เปิด-หน้าร้าน': item.openFront === '' ? 0 : item.openFront,
    '(C) เปิด-หลังร้าน': item.openBack === '' ? 0 : item.openBack,
    '(C) รวมร้านเปิด': item.totalOpen,
    '(D) ปิด-หน้าร้าน': item.closeFront === '' ? 0 : item.closeFront,
    '(D) ปิด-หลังร้าน': item.closeBack === '' ? 0 : item.closeBack,
    '(D) คงเหลือร้านปิด': item.totalClose,
    '(E) ขาย': item.sold,
    'สถานะตรวจสอบ (A+B vs C)': item.isDiscrepancy ? `เตือน: ต่างกัน ${item.discrepancyDiff > 0 ? '+' : ''}${item.discrepancyDiff}` : 'ถูกต้อง',
    'หมายเหตุ': item.remark || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set column widths for clean readability
  worksheet['!cols'] = [
    { wch: 6 },  // ลำดับ
    { wch: 20 }, // รายการ
    { wch: 14 }, // หมวดหมู่
    { wch: 8 },  // หน่วย
    { wch: 14 }, // A
    { wch: 14 }, // B
    { wch: 15 }, // C หน้า
    { wch: 15 }, // C หลัง
    { wch: 16 }, // C รวม
    { wch: 15 }, // D หน้า
    { wch: 15 }, // D หลัง
    { wch: 18 }, // D รวม
    { wch: 14 }, // E ขาย
    { wch: 24 }, // สถานะ
    { wch: 25 }, // หมายเหตุ
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'สต็อกประจำวัน');

  const fileName = `สต็อกร้านจ๊าบบาร์_${reportDate}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
