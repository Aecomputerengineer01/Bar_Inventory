import React from 'react';
import type { CalculatedItem, StockItem } from '../types/stock';
import { NumberInput } from './NumberInput';
import { AlertTriangle, Check, Trash2 } from 'lucide-react';

interface StockCardMobileProps {
  items: CalculatedItem[];
  onUpdateItem: (id: string, updates: Partial<StockItem>) => void;
  onDeleteItem: (id: string) => void;
}

export const StockCardMobile: React.FC<StockCardMobileProps> = ({
  items,
  onUpdateItem,
  onDeleteItem,
}) => {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isWarning = item.isDiscrepancy;

        return (
          <div
            key={item.id}
            className={`bg-white rounded-xl p-3.5 border shadow-2xs transition-all ${
              isWarning ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
            }`}
          >
            {/* Card Header: No, Name, Category and HIGHLIGHTED Sold (E) */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-start space-x-2.5">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {item.no}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-[11px] text-slate-400 font-medium">
                      หน่วย: {item.unit}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                      item.category === 'liquor'
                        ? 'bg-amber-50 text-amber-700'
                        : item.category === 'beer'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}>
                      {item.category === 'liquor' ? 'สุรา/วิสกี้' : item.category === 'beer' ? 'เบียร์' : 'มิกเซอร์'}
                    </span>
                  </div>
                </div>
              </div>

              {/* HIGHLIGHTED (E) SOLD BADGE */}
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-xl shadow-xs">
                  <span className="text-[11px] font-semibold text-emerald-100 uppercase">
                    (E) ขาย:
                  </span>
                  <span className="text-lg font-black">{item.sold}</span>
                </div>
                {item.sold < 0 && (
                  <span className="text-[10px] text-rose-500 font-semibold mt-0.5">
                    นับเกินเปิดร้าน
                  </span>
                )}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="pt-3 space-y-3">
              {/* Row 1: (A) Brought Forward & (B) Added */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50/70 p-2 rounded-lg border border-slate-200/70">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    (A) ยอดยกมา
                  </label>
                  <NumberInput
                    value={item.broughtForward}
                    onChange={(val) => onUpdateItem(item.id, { broughtForward: val })}
                    placeholder="0"
                    showSteppers={true}
                  />
                </div>
                <div className="bg-slate-50/70 p-2 rounded-lg border border-slate-200/70">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    (B) สั่งเพิ่ม
                  </label>
                  <NumberInput
                    value={item.added}
                    onChange={(val) => onUpdateItem(item.id, { added: val })}
                    placeholder="0"
                    showSteppers={true}
                  />
                </div>
              </div>

              {/* Row 2: (C) Total Open (หน้าร้าน + หลังร้าน) */}
              <div className={`p-2.5 rounded-lg border transition-colors ${
                isWarning ? 'bg-amber-50/50 border-amber-200' : 'bg-sky-50/40 border-sky-200/70'
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-sky-950 flex items-center space-x-1">
                    <span>(C) รวมร้านเปิด</span>
                    <span className="text-[10px] font-normal text-sky-700">(หน้าร้าน + หลังร้าน)</span>
                  </span>
                  <div className="flex items-center space-x-1 font-bold text-xs">
                    <span className="text-sky-900">รวม:</span>
                    <span className="text-sm font-extrabold text-sky-950 px-1.5 py-0.5 bg-white rounded border border-sky-200">
                      {item.totalOpen}
                    </span>
                    {isWarning ? (
                      <span className="text-[11px] text-amber-700 font-bold bg-amber-100 px-1 rounded flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-0.5" />
                        ต่าง {item.discrepancyDiff > 0 ? `+${item.discrepancyDiff}` : item.discrepancyDiff}
                      </span>
                    ) : (
                      (item.openFront !== '' || item.openBack !== '') && (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-0.5">หน้าร้าน</span>
                    <NumberInput
                      value={item.openFront}
                      onChange={(val) => onUpdateItem(item.id, { openFront: val })}
                      placeholder="0"
                      showSteppers={true}
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-0.5">หลังร้าน</span>
                    <NumberInput
                      value={item.openBack}
                      onChange={(val) => onUpdateItem(item.id, { openBack: val })}
                      placeholder="0"
                      showSteppers={true}
                    />
                  </div>
                </div>

                {isWarning && (
                  <p className="text-[10px] font-medium text-amber-700 mt-1.5 leading-tight flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1 shrink-0" />
                    ยอดเปิด ({item.totalOpen}) ไม่ตรงกับ ยอดยกมา+สั่งเพิ่ม ({item.expectedOpen})
                  </p>
                )}
              </div>

              {/* Row 3: (D) Total Close (หน้าร้าน + หลังร้าน) */}
              <div className="bg-slate-100/60 p-2.5 rounded-lg border border-slate-200/80">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                    <span>(D) คงเหลือร้านปิด</span>
                    <span className="text-[10px] font-normal text-slate-500">(หน้าร้าน + หลังร้าน)</span>
                  </span>
                  <div className="flex items-center space-x-1 font-bold text-xs">
                    <span className="text-slate-600">รวม:</span>
                    <span className="text-sm font-extrabold text-slate-900 px-1.5 py-0.5 bg-white rounded border border-slate-200">
                      {item.totalClose}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-0.5">หน้าร้าน</span>
                    <NumberInput
                      value={item.closeFront}
                      onChange={(val) => onUpdateItem(item.id, { closeFront: val })}
                      placeholder="0"
                      showSteppers={true}
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-0.5">หลังร้าน</span>
                    <NumberInput
                      value={item.closeBack}
                      onChange={(val) => onUpdateItem(item.id, { closeBack: val })}
                      placeholder="0"
                      showSteppers={true}
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Remark & Delete */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  value={item.remark}
                  onChange={(e) => onUpdateItem(item.id, { remark: e.target.value })}
                  placeholder="หมายเหตุ (ถ้ามี)..."
                  className="flex-1 text-xs py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => onDeleteItem(item.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-md transition"
                  title="ลบรายการ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
