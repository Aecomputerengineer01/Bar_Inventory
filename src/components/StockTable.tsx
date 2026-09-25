import React from 'react';
import type { CalculatedItem, StockItem } from '../types/stock';
import { NumberInput } from './NumberInput';
import { AlertTriangle, Check, Trash2 } from 'lucide-react';

interface StockTableProps {
  items: CalculatedItem[];
  onUpdateItem: (id: string, updates: Partial<StockItem>) => void;
  onDeleteItem: (id: string) => void;
  totals: {
    totalBroughtForward: number;
    totalAdded: number;
    totalOpen: number;
    totalClose: number;
    totalSold: number;
  };
}

export const StockTable: React.FC<StockTableProps> = ({
  items,
  onUpdateItem,
  onDeleteItem,
  totals,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden">
      {/* Horizontal scroll container with scrollbar styling */}
      <div className="overflow-x-auto table-container">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          {/* Table Header */}
          <thead>
            {/* Row 1 of Header */}
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold text-center select-none">
              {/* Sticky Column: No. */}
              <th
                rowSpan={2}
                className="py-3 px-2 sticky left-0 z-20 bg-slate-50 border-r border-slate-200 w-12 text-center text-slate-500 font-medium"
              >
                ลำดับ
              </th>

              {/* Sticky Column: Item Name */}
              <th
                rowSpan={2}
                className="py-3 px-3 sticky left-12 z-20 bg-slate-50 border-r border-slate-300 min-w-[150px] sm:min-w-[180px] text-left text-slate-800 font-bold shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]"
              >
                รายการเครื่องดื่ม
              </th>

              {/* (A) Brought Forward */}
              <th
                rowSpan={2}
                className="py-2 px-2 border-r border-slate-200 min-w-[90px] bg-slate-50/80 text-slate-700"
              >
                <div className="font-bold text-slate-800">(A) ยอดยกมา</div>
                <div className="text-[11px] font-normal text-slate-400">สต็อกเดิม</div>
              </th>

              {/* (B) Added */}
              <th
                rowSpan={2}
                className="py-2 px-2 border-r border-slate-200 min-w-[90px] bg-slate-50/80 text-slate-700"
              >
                <div className="font-bold text-slate-800">(B) สั่งเพิ่ม</div>
                <div className="text-[11px] font-normal text-slate-400">ของใหม่</div>
              </th>

              {/* (C) Total Open */}
              <th
                colSpan={3}
                className="py-1 px-2 border-r border-slate-200 bg-sky-50/70 text-sky-950 font-bold border-b border-sky-100"
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>(C) รวมร้านเปิด</span>
                  <span className="text-[11px] font-normal text-sky-700">(หน้าร้าน + หลังร้าน)</span>
                </div>
              </th>

              {/* (D) Total Close */}
              <th
                colSpan={3}
                className="py-1 px-2 border-r border-slate-200 bg-slate-100/70 text-slate-800 font-bold border-b border-slate-200"
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>(D) คงเหลือร้านปิด</span>
                  <span className="text-[11px] font-normal text-slate-500">(หน้าร้าน + หลังร้าน)</span>
                </div>
              </th>

              {/* (E) Sold - HIGHLIGHTED HEADER */}
              <th
                rowSpan={2}
                className="py-3 px-3 border-r border-emerald-300 min-w-[110px] bg-emerald-600 text-white font-extrabold shadow-sm"
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs uppercase tracking-wider text-emerald-100">คำนวณอัตโนมัติ</span>
                  <span className="text-base sm:text-lg font-black tracking-wide">(E) ขาย</span>
                  <span className="text-[11px] font-normal text-emerald-200">(C - D)</span>
                </div>
              </th>

              {/* Remark */}
              <th
                rowSpan={2}
                className="py-3 px-3 border-r border-slate-200 min-w-[140px] text-slate-700 font-medium"
              >
                หมายเหตุ
              </th>

              {/* Action */}
              <th
                rowSpan={2}
                className="py-3 px-2 min-w-[50px] text-slate-400 font-normal no-print"
              >
                ลบ
              </th>
            </tr>

            {/* Row 2 of Header: Sub-columns for C and D */}
            <tr className="bg-slate-50 border-b border-slate-200 text-center text-xs select-none">
              {/* Sub-columns for (C) */}
              <th className="py-1 px-1.5 border-r border-slate-200 font-medium text-sky-800 bg-sky-50/50 min-w-[70px]">
                หน้าร้าน
              </th>
              <th className="py-1 px-1.5 border-r border-slate-200 font-medium text-sky-800 bg-sky-50/50 min-w-[70px]">
                หลังร้าน
              </th>
              <th className="py-1 px-2 border-r border-slate-200 font-bold text-sky-900 bg-sky-100/60 min-w-[85px]">
                รวม (C)
              </th>

              {/* Sub-columns for (D) */}
              <th className="py-1 px-1.5 border-r border-slate-200 font-medium text-slate-600 bg-slate-100/40 min-w-[70px]">
                หน้าร้าน
              </th>
              <th className="py-1 px-1.5 border-r border-slate-200 font-medium text-slate-600 bg-slate-100/40 min-w-[70px]">
                หลังร้าน
              </th>
              <th className="py-1 px-2 border-r border-slate-200 font-bold text-slate-800 bg-slate-200/50 min-w-[85px]">
                รวม (D)
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {items.map((item, index) => {
              const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40';
              const isWarning = item.isDiscrepancy;

              return (
                <tr
                  key={item.id}
                  className={`${rowBg} hover:bg-emerald-50/20 transition-colors group`}
                >
                  {/* Sticky: No. */}
                  <td className={`py-2 px-2 sticky left-0 z-10 border-r border-slate-200 text-center font-medium text-slate-400 group-hover:bg-emerald-50/20 ${rowBg}`}>
                    {item.no}
                  </td>

                  {/* Sticky: Name */}
                  <td className={`py-2 px-3 sticky left-12 z-10 border-r border-slate-200 font-semibold text-slate-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] group-hover:bg-emerald-50/20 ${rowBg}`}>
                    <div className="flex flex-col">
                      <span className="text-slate-900 text-sm font-semibold">{item.name}</span>
                      <div className="flex items-center space-x-1.5 mt-0.5">
                        <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-normal ${
                          item.category === 'liquor'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                            : item.category === 'beer'
                            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200/60'
                            : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                        }`}>
                          {item.unit}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* (A) Brought Forward */}
                  <td className="py-2 px-1.5 border-r border-slate-200 text-center">
                    <NumberInput
                      value={item.broughtForward}
                      onChange={(val) => onUpdateItem(item.id, { broughtForward: val })}
                      placeholder="0"
                      ariaLabel={`ยอดยกมา ${item.name}`}
                    />
                  </td>

                  {/* (B) Added */}
                  <td className="py-2 px-1.5 border-r border-slate-200 text-center">
                    <NumberInput
                      value={item.added}
                      onChange={(val) => onUpdateItem(item.id, { added: val })}
                      placeholder="0"
                      ariaLabel={`สั่งเพิ่ม ${item.name}`}
                    />
                  </td>

                  {/* (C) - Open Front */}
                  <td className="py-2 px-1.5 border-r border-slate-200 text-center bg-sky-50/20">
                    <NumberInput
                      value={item.openFront}
                      onChange={(val) => onUpdateItem(item.id, { openFront: val })}
                      placeholder="0"
                      ariaLabel={`เปิดหน้าร้าน ${item.name}`}
                      className="border-sky-200/70 focus:border-sky-500 focus:ring-sky-500/20"
                    />
                  </td>

                  {/* (C) - Open Back */}
                  <td className="py-2 px-1.5 border-r border-slate-200 text-center bg-sky-50/20">
                    <NumberInput
                      value={item.openBack}
                      onChange={(val) => onUpdateItem(item.id, { openBack: val })}
                      placeholder="0"
                      ariaLabel={`เปิดหลังร้าน ${item.name}`}
                      className="border-sky-200/70 focus:border-sky-500 focus:ring-sky-500/20"
                    />
                  </td>

                  {/* (C) - Total Auto Calculated with Discrepancy Warning */}
                  <td className={`py-2 px-2 border-r border-slate-200 text-center font-bold text-sm transition-colors ${
                    isWarning ? 'bg-amber-100/70 text-amber-900 ring-1 ring-inset ring-amber-400' : 'bg-sky-100/40 text-sky-950'
                  }`}>
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-base font-extrabold">{item.totalOpen}</span>
                      {isWarning ? (
                        <div
                          className="inline-flex items-center text-amber-600 cursor-help"
                          title={`ยอดรวมเปิดร้าน (${item.totalOpen}) ไม่ตรงกับ ยอดยกมา+สั่งเพิ่ม (${item.expectedOpen}) ผลต่าง: ${
                            item.discrepancyDiff > 0 ? `+${item.discrepancyDiff}` : item.discrepancyDiff
                          }`}
                        >
                          <AlertTriangle className="w-4 h-4 text-amber-600 animate-pulse" />
                        </div>
                      ) : (
                        (item.openFront !== '' || item.openBack !== '') && (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        )
                      )}
                    </div>
                    {isWarning && (
                      <span className="block text-[10px] font-semibold text-amber-700 leading-tight">
                        ต่าง {item.discrepancyDiff > 0 ? `+${item.discrepancyDiff}` : item.discrepancyDiff}
                      </span>
                    )}
                  </td>

                  {/* (D) - Close Front */}
                  <td className="py-2 px-1.5 border-r border-slate-200 text-center bg-slate-50/30">
                    <NumberInput
                      value={item.closeFront}
                      onChange={(val) => onUpdateItem(item.id, { closeFront: val })}
                      placeholder="0"
                      ariaLabel={`ปิดหน้าร้าน ${item.name}`}
                    />
                  </td>

                  {/* (D) - Close Back */}
                  <td className="py-2 px-1.5 border-r border-slate-200 text-center bg-slate-50/30">
                    <NumberInput
                      value={item.closeBack}
                      onChange={(val) => onUpdateItem(item.id, { closeBack: val })}
                      placeholder="0"
                      ariaLabel={`ปิดหลังร้าน ${item.name}`}
                    />
                  </td>

                  {/* (D) - Total Auto Calculated */}
                  <td className="py-2 px-2 border-r border-slate-200 text-center font-bold text-sm bg-slate-100/60 text-slate-800">
                    <span className="text-base font-extrabold">{item.totalClose}</span>
                  </td>

                  {/* (E) Sold - MAXIMUM PROMINENCE HIGHLIGHT */}
                  <td className="py-2 px-3 border-r border-emerald-300 text-center bg-emerald-500/10 font-bold transition-all">
                    <div className="inline-flex items-center justify-center min-w-[56px] py-1 px-2.5 rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
                      <span className="text-base sm:text-lg font-black tracking-tight">
                        {item.sold}
                      </span>
                    </div>
                    {item.sold < 0 && (
                      <div className="text-[10px] text-rose-600 font-semibold mt-0.5">
                        ⚠️ นับเกินเปิด
                      </div>
                    )}
                  </td>

                  {/* Remark */}
                  <td className="py-2 px-2 border-r border-slate-200">
                    <input
                      type="text"
                      value={item.remark}
                      onChange={(e) => onUpdateItem(item.id, { remark: e.target.value })}
                      placeholder="บันทึกเพิ่มเติม..."
                      className="w-full text-xs py-1.5 px-2 bg-transparent text-slate-700 border border-transparent hover:border-slate-200 focus:bg-white focus:border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </td>

                  {/* Delete button */}
                  <td className="py-2 px-2 text-center no-print">
                    <button
                      type="button"
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded transition"
                      title={`ลบรายการ ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Table Footer - Total Row */}
          <tfoot>
            <tr className="bg-slate-100 border-t-2 border-slate-300 font-bold text-slate-900 text-center">
              {/* Sticky Columns for Total */}
              <td
                colSpan={2}
                className="py-3 px-3 sticky left-0 z-10 bg-slate-100 border-r border-slate-300 text-right pr-4 text-xs sm:text-sm font-extrabold uppercase shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]"
              >
                รวมทั้งหมด ({items.length} รายการ) :
              </td>

              {/* Total A */}
              <td className="py-2 px-2 border-r border-slate-200 text-slate-800 text-sm font-extrabold">
                {totals.totalBroughtForward}
              </td>

              {/* Total B */}
              <td className="py-2 px-2 border-r border-slate-200 text-slate-800 text-sm font-extrabold">
                {totals.totalAdded}
              </td>

              {/* Empty sub-cols for C */}
              <td className="py-2 px-1 border-r border-slate-200 text-slate-400 text-xs">-</td>
              <td className="py-2 px-1 border-r border-slate-200 text-slate-400 text-xs">-</td>

              {/* Total C */}
              <td className="py-2 px-2 border-r border-slate-200 bg-sky-100 text-sky-950 text-sm font-extrabold">
                {totals.totalOpen}
              </td>

              {/* Empty sub-cols for D */}
              <td className="py-2 px-1 border-r border-slate-200 text-slate-400 text-xs">-</td>
              <td className="py-2 px-1 border-r border-slate-200 text-slate-400 text-xs">-</td>

              {/* Total D */}
              <td className="py-2 px-2 border-r border-slate-200 bg-slate-200 text-slate-900 text-sm font-extrabold">
                {totals.totalClose}
              </td>

              {/* Total E - HIGHLIGHTED FOOTER TOTAL */}
              <td className="py-2.5 px-3 border-r border-emerald-300 bg-emerald-600 text-white font-black text-base sm:text-lg">
                {totals.totalSold}
              </td>

              {/* Remark & Action empty footers */}
              <td className="py-2 px-2 border-r border-slate-200"></td>
              <td className="py-2 px-2 no-print"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
