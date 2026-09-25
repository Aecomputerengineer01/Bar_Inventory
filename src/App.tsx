import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import type { StockItem, DailySnapshot } from './types/stock';
import { 
  loadStockItems, 
  saveStockItems, 
  loadStockDate, 
  saveStockDate, 
  loadHistory, 
  saveHistory 
} from './utils/storage';
import { SAMPLE_MOCK_DATA } from './utils/initialData';
import { calculateItem, calculateSummary, shiftToNextDay } from './utils/calculator';
import { exportToExcel } from './utils/exportExcel';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { StockTable } from './components/StockTable';
import { StockCardMobile } from './components/StockCardMobile';
import { CloseDayModal } from './components/CloseDayModal';
import { AddItemModal } from './components/AddItemModal';
import { HistoryModal } from './components/HistoryModal';
import { Info } from 'lucide-react';

export const App: React.FC = () => {
  // 1. Core State
  const [items, setItems] = useState<StockItem[]>(() => loadStockItems());
  const [currentDate, setCurrentDate] = useState<string>(() => loadStockDate());
  const [history, setHistory] = useState<DailySnapshot[]>(() => loadHistory());

  // 2. UI State
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 3. Modals
  const [isCloseDayOpen, setIsCloseDayOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // 4. Auto-save to LocalStorage whenever items change
  useEffect(() => {
    saveStockItems(items);
  }, [items]);

  useEffect(() => {
    saveStockDate(currentDate);
  }, [currentDate]);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  // 5. Real-time Calculation for all items
  const allCalculatedItems = useMemo(() => {
    return items.map((item) => calculateItem(item));
  }, [items]);

  // Summary Metrics
  const summary = useMemo(() => {
    return calculateSummary(allCalculatedItems);
  }, [allCalculatedItems]);

  // 6. Filter & Search items
  const filteredItems = useMemo(() => {
    return allCalculatedItems.filter((item) => {
      // Search by name
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Filter by category
      if (activeFilter === 'all') return true;
      if (activeFilter === 'discrepancy') return item.isDiscrepancy;
      return item.category === activeFilter;
    });
  }, [allCalculatedItems, searchQuery, activeFilter]);

  // 7. Update Item handler
  const handleUpdateItem = useCallback((id: string, updates: Partial<StockItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  // 8. Delete Item handler
  const handleDeleteItem = useCallback((id: string) => {
    const target = items.find((i) => i.id === id);
    if (!target) return;
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ "${target.name}" ออกจากรายการ?`)) {
      setItems((prev) => {
        const remaining = prev.filter((i) => i.id !== id);
        // Re-number
        return remaining.map((item, idx) => ({ ...item, no: idx + 1 }));
      });
    }
  }, [items]);

  // 9. Add New Item handler
  const handleAddItem = useCallback((newItem: Omit<StockItem, 'id' | 'no'>) => {
    setItems((prev) => [
      ...prev,
      {
        ...newItem,
        id: `item-${Date.now()}`,
        no: prev.length + 1,
      },
    ]);
  }, []);

  // 10. Close Day Shift handler
  const handleCloseDayConfirm = useCallback(() => {
    // 1. Create history snapshot
    const snapshot: DailySnapshot = {
      id: `snapshot-${Date.now()}`,
      date: currentDate,
      timestamp: Date.now(),
      totalSold: summary.totalSold,
      items: allCalculatedItems,
    };
    setHistory((prev) => [snapshot, ...prev]);

    // 2. Perform Next Day Shift logic:
    // (D) -> (A), Clear B, C, D, Remark
    const nextDayItems = shiftToNextDay(items);
    setItems(nextDayItems);

    // 3. Advance date to tomorrow
    const current = new Date(currentDate);
    if (!isNaN(current.getTime())) {
      current.setDate(current.getDate() + 1);
      setCurrentDate(current.toISOString().split('T')[0]);
    }

    // 4. Celebrate with Confetti 🎉
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, [currentDate, summary.totalSold, allCalculatedItems, items]);

  // 11. Load sample mock data
  const handleLoadSample = useCallback(() => {
    if (window.confirm('ต้องการโหลดข้อมูลตัวอย่างสำหรับทดสอบระบบหรือไม่? (ข้อมูลปัจจุบันจะถูกแทนที่)')) {
      setItems(SAMPLE_MOCK_DATA);
    }
  }, []);

  // 12. Reset all data to blank inputs
  const handleResetData = useCallback(() => {
    if (window.confirm('คุณต้องการรีเซ็ตตัวเลขทั้งหมดเป็นค่าว่างเพื่อเริ่มนับใหม่หรือไม่? (รายชื่อสินค้าจะยังอยู่เหมือนเดิม)')) {
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          broughtForward: '',
          added: '',
          openFront: '',
          openBack: '',
          closeFront: '',
          closeBack: '',
          remark: '',
        }))
      );
    }
  }, []);

  // 13. Export to Excel
  const handleExportExcel = useCallback(() => {
    exportToExcel(allCalculatedItems, currentDate);
  }, [allCalculatedItems, currentDate]);

  // 14. Print
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // 15. Clear history
  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 text-slate-800">
      {/* Top Header */}
      <Header
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onExportExcel={handleExportExcel}
        onPrint={handlePrint}
        onOpenAddItem={() => setIsAddItemOpen(true)}
        onOpenCloseDay={() => setIsCloseDayOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onLoadSample={handleLoadSample}
        onResetData={handleResetData}
        hasDiscrepancies={summary.discrepancyCount > 0}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {/* KPI Summary Cards & Category Filter */}
        <SummaryCards
          summary={summary}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Informative Guidance Banner */}
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-600">
          <div className="flex items-start sm:items-center space-x-2">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>ตรรกะการคำนวณอัตโนมัติ:</strong> (C) รวมร้านเปิด = หน้าร้าน + หลังร้าน &nbsp;|&nbsp; 
              (D) คงเหลือร้านปิด = หน้าร้าน + หลังร้าน &nbsp;|&nbsp; 
              <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                (E) ขาย = (C) - (D)
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center">
              <span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
              ⚠️ แจ้งเตือนเมื่อ (A+B) ≠ (C)
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
              ปิดยอดจะยก (D) ไปเป็น (A)
            </span>
          </div>
        </div>

        {/* Stock List Display: Table View or Mobile Card View */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 text-slate-400">
            <p className="text-base font-semibold text-slate-600">ไม่พบรายการเครื่องดื่มที่ค้นหา</p>
            <p className="text-xs text-slate-400 mt-1">
              ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น
            </p>
          </div>
        ) : viewMode === 'table' ? (
          <StockTable
            items={filteredItems}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            totals={summary}
          />
        ) : (
          <StockCardMobile
            items={filteredItems}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        )}

        {/* Mobile floating Day-shift footer */}
        <div className="md:hidden sticky bottom-3 z-20">
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 block">ยอดขายรวมวันนี้</span>
              <span className="text-lg font-black text-emerald-600">
                {summary.totalSold} <span className="text-xs font-normal">หน่วย</span>
              </span>
            </div>
            <button
              onClick={() => setIsCloseDayOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/30 flex items-center space-x-1"
            >
              <span>ปิดยอดประจำวัน</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="m-0">
            © {new Date().getFullYear()} ร้านจ๊าบบาร์ (Jabb Bar) - ระบบบริหารและนับสต็อกเครื่องดื่ม
          </p>
          <p className="m-0 text-slate-400">
            ออกแบบสำหรับใช้งานผ่านมือถือ แท็บเล็ต และคอมพิวเตอร์ • โทนสีขาวสว่างตา
          </p>
        </div>
      </footer>

      {/* Modals */}
      <CloseDayModal
        isOpen={isCloseDayOpen}
        onClose={() => setIsCloseDayOpen(false)}
        onConfirm={handleCloseDayConfirm}
        currentDate={currentDate}
        summary={summary}
      />

      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAdd={handleAddItem}
        existingCount={items.length}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
};

export default App;
