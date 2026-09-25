import React from 'react';
import type { StockSummary } from '../utils/calculator';
import { Package, TrendingUp, AlertTriangle, Layers, Wine } from 'lucide-react';

interface SummaryCardsProps {
  summary: StockSummary;
  activeFilter: string;
  onFilterChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  summary,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="space-y-3">
      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Card 1: Total Items */}
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">จำนวนเครื่องดื่ม</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              {summary.totalItems}{' '}
              <span className="text-xs font-normal text-slate-400">รายการ</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <Wine className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Total Open (C) */}
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">รวมเปิดร้าน (C)</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-800 mt-0.5">
              {summary.totalOpen}{' '}
              <span className="text-xs font-normal text-slate-400">หน่วย</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Total Sold (E) - PROMINENT HIGHLIGHT */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 sm:p-4 text-white shadow-sm shadow-emerald-500/20 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <p className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">
                (E) ยอดขายรวมวันนี้
              </p>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5">
              {summary.totalSold}{' '}
              <span className="text-xs font-medium text-emerald-200">หน่วย/ขวด</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Discrepancies Alert & Closing Stock */}
        <div className={`rounded-xl p-3 sm:p-4 border shadow-2xs flex items-center justify-between transition-colors ${
          summary.discrepancyCount > 0
            ? 'bg-amber-50/70 border-amber-200 text-amber-900'
            : 'bg-white border-slate-200/80'
        }`}>
          <div>
            <p className={`text-xs font-medium ${
              summary.discrepancyCount > 0 ? 'text-amber-800' : 'text-slate-500'
            }`}>
              {summary.discrepancyCount > 0 ? '⚠️ ยอดเปิดไม่ตรง' : 'คงเหลือร้านปิด (D)'}
            </p>
            <p className={`text-xl sm:text-2xl font-bold mt-0.5 ${
              summary.discrepancyCount > 0 ? 'text-amber-700' : 'text-slate-900'
            }`}>
              {summary.discrepancyCount > 0 ? (
                <>
                  {summary.discrepancyCount}{' '}
                  <span className="text-xs font-normal text-amber-600">รายการที่ต้องตรวจ</span>
                </>
              ) : (
                <>
                  {summary.totalClose}{' '}
                  <span className="text-xs font-normal text-slate-400">คงเหลือ</span>
                </>
              )}
            </p>
          </div>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            summary.discrepancyCount > 0
              ? 'bg-amber-100 text-amber-700 animate-bounce'
              : 'bg-slate-100 text-slate-600'
          }`}>
            {summary.discrepancyCount > 0 ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Package className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Category Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => onFilterChange('liquor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeFilter === 'liquor'
                ? 'bg-amber-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🥃 สุรา / บรั่นดี
          </button>
          <button
            onClick={() => onFilterChange('beer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeFilter === 'beer'
                ? 'bg-yellow-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🍺 เบียร์
          </button>
          <button
            onClick={() => onFilterChange('mixer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeFilter === 'mixer'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🥤 มิกเซอร์ / น้ำ
          </button>
          {summary.discrepancyCount > 0 && (
            <button
              onClick={() => onFilterChange('discrepancy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeFilter === 'discrepancy'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              ⚠️ รายการยอดไม่ตรง ({summary.discrepancyCount})
            </button>
          )}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="ค้นหาชื่อเครื่องดื่ม..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          />
          <span className="absolute left-2.5 top-2 text-slate-400 text-xs">🔍</span>
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1.5 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
