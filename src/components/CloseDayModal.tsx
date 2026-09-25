import React from 'react';
import { ArrowRightCircle, AlertTriangle, CheckCircle, Sparkles, X } from 'lucide-react';
import type { StockSummary } from '../utils/calculator';

interface CloseDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentDate: string;
  summary: StockSummary;
}

export const CloseDayModal: React.FC<CloseDayModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentDate,
  summary,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <ArrowRightCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white m-0">ยืนยันการปิดยอดประจำวัน</h2>
              <p className="text-xs text-emerald-100 font-normal m-0">
                วันทำการ: {currentDate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Summary Box */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              สรุปภาพรวมก่อนปิดยอด
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-500 block">ยอดขายรวม (E)</span>
                <span className="text-xl font-extrabold text-emerald-600">
                  {summary.totalSold} <span className="text-xs font-normal">หน่วย</span>
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-500 block">คงเหลือร้านปิด (D)</span>
                <span className="text-xl font-extrabold text-slate-800">
                  {summary.totalClose} <span className="text-xs font-normal">หน่วย</span>
                </span>
              </div>
            </div>

            {summary.discrepancyCount > 0 && (
              <div className="flex items-start space-x-2 bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs text-amber-800 mt-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>ตรวจพบ {summary.discrepancyCount} รายการ</strong> ที่ยอดเปิดร้านไม่ตรงกับยอดยกมาบวกสั่งเพิ่ม คุณยังคงสามารถปิดยอดได้ แต่แนะนำให้ตรวจนับอีกครั้ง
                </span>
              </div>
            )}
          </div>

          {/* Action explanation */}
          <div className="space-y-2 text-xs text-slate-600 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>ยกยอดไปวันใหม่:</strong> ตัวเลขจากช่อง <strong>(D) คงเหลือร้านปิด</strong> จะถูกโอนไปเป็น <strong>(A) ยอดยกมา</strong> ของวันพรุ่งนี้
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>ล้างค่าเริ่มนับใหม่:</strong> ช่องสั่งเพิ่ม (B), หน้าร้าน-หลังร้าน (C, D) และหมายเหตุ จะถูกรีเซ็ตเป็นค่าว่าง
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>สำรองประวัติ:</strong> ข้อมูลยอดขายและสต็อกของวันนี้จะถูกบันทึกเก็บไว้ใน <em>"ประวัติการปิดยอด"</em> โดยอัตโนมัติ
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg shadow-sm shadow-emerald-600/30 transition flex items-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>ยืนยันปิดยอด & เริ่มวันใหม่</span>
          </button>
        </div>
      </div>
    </div>
  );
};
