import React from 'react';
import { 
  Calendar, 
  FileSpreadsheet, 
  Printer, 
  History, 
  PlusCircle, 
  Sparkles, 
  RotateCcw, 
  LayoutList, 
  Table as TableIcon,
  CheckCircle2,
  ArrowRightCircle
} from 'lucide-react';

interface HeaderProps {
  currentDate: string;
  onDateChange: (date: string) => void;
  viewMode: 'table' | 'cards';
  onViewModeChange: (mode: 'table' | 'cards') => void;
  onExportExcel: () => void;
  onPrint: () => void;
  onOpenAddItem: () => void;
  onOpenCloseDay: () => void;
  onOpenHistory: () => void;
  onLoadSample: () => void;
  onResetData: () => void;
  hasDiscrepancies: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentDate,
  onDateChange,
  viewMode,
  onViewModeChange,
  onExportExcel,
  onPrint,
  onOpenAddItem,
  onOpenCloseDay,
  onOpenHistory,
  onLoadSample,
  onResetData,
  hasDiscrepancies,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
          {/* Logo & Brand title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-bold text-xl ring-2 ring-white">
                🍻
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 m-0">
                    ร้านจ๊าบบาร์ <span className="text-emerald-600 font-medium text-sm sm:text-base">(Jabb Bar)</span>
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                    ระบบนับสต็อก
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-normal m-0 hidden sm:block">
                  ระบบบันทึกและคำนวณสต็อกเครื่องดื่มหน้าร้าน-หลังร้าน Real-time
                </p>
              </div>
            </div>

            {/* Mobile Only Day-shift trigger button */}
            <button
              onClick={onOpenCloseDay}
              className="md:hidden flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 active:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm shadow-emerald-600/30"
            >
              <ArrowRightCircle className="w-3.5 h-3.5" />
              <span>ปิดยอด</span>
            </button>
          </div>

          {/* Controls: Date, view toggle & actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Date selector */}
            <div className="inline-flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
              <Calendar className="w-4 h-4 text-slate-400 mr-1.5 shrink-0" />
              <input
                type="date"
                value={currentDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex p-0.5 bg-slate-100 border border-slate-200 rounded-lg">
              <button
                type="button"
                onClick={() => onViewModeChange('table')}
                className={`flex items-center px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="มุมมองตารางเต็ม"
              >
                <TableIcon className="w-3.5 h-3.5 mr-1" />
                <span className="hidden sm:inline">ตาราง</span>
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('cards')}
                className={`flex items-center px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="มุมมองการ์ด เหมาะสำหรับมือถือ"
              >
                <LayoutList className="w-3.5 h-3.5 mr-1" />
                <span className="hidden sm:inline">การ์ดมือถือ</span>
              </button>
            </div>

            {/* Quick action: Add Item */}
            <button
              onClick={onOpenAddItem}
              className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition shadow-2xs"
            >
              <PlusCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              <span>เพิ่มสินค้า</span>
            </button>

            {/* Export & Print */}
            <button
              onClick={onExportExcel}
              className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition shadow-2xs"
              title="ส่งออกรายงานเป็นไฟล์ Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              <span className="hidden sm:inline">Excel</span>
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition shadow-2xs"
              title="พิมพ์ใบเช็คสต็อก"
            >
              <Printer className="w-3.5 h-3.5 mr-1 text-slate-500" />
              <span className="hidden sm:inline">พิมพ์</span>
            </button>

            {/* History */}
            <button
              onClick={onOpenHistory}
              className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition shadow-2xs"
              title="ดูประวัติการปิดยอดที่ผ่านมา"
            >
              <History className="w-3.5 h-3.5 mr-1 text-indigo-500" />
              <span className="hidden sm:inline">ประวัติ</span>
            </button>

            {/* Next Day Shift (Close Day) - Desktop Highlight Button */}
            <button
              onClick={onOpenCloseDay}
              className="hidden md:inline-flex items-center px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg text-xs font-semibold transition shadow-sm shadow-emerald-500/20 active:scale-98"
            >
              <ArrowRightCircle className="w-4 h-4 mr-1.5" />
              <span>ปิดยอดประจำวัน</span>
            </button>
          </div>
        </div>

        {/* Sub-bar with auto-saved status and demo data utilities */}
        <div className="py-1.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1" />
              บันทึกลงเครื่องอัตโนมัติ (Local Storage)
            </span>
            {hasDiscrepancies && (
              <span className="inline-flex items-center text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-200/60">
                ⚠️ ตรวจพบยอดเปิดร้านไม่ตรงกับยอดยกมา
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onLoadSample}
              className="text-slate-500 hover:text-emerald-700 inline-flex items-center text-[11px] font-medium hover:underline"
              title="ใส่ข้อมูลตัวเลขจำลองเพื่อทดสอบการคำนวณ"
            >
              <Sparkles className="w-3 h-3 mr-0.5 text-amber-500" />
              โหลดข้อมูลตัวอย่าง
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={onResetData}
              className="text-slate-400 hover:text-rose-600 inline-flex items-center text-[11px] hover:underline"
              title="รีเซ็ตตารางกลับเป็นค่าเริ่มต้น"
            >
              <RotateCcw className="w-3 h-3 mr-0.5" />
              รีเซ็ตค่าว่าง
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
