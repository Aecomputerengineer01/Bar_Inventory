import React, { useState } from 'react';
import { X, Calendar, Download, Trash2, FileSpreadsheet, Eye } from 'lucide-react';
import type { DailySnapshot } from '../types/stock';
import { exportToExcel } from '../utils/exportExcel';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: DailySnapshot[];
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
}) => {
  const [selectedSnapshot, setSelectedSnapshot] = useState<DailySnapshot | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white m-0">
                ประวัติการปิดยอดสต็อกย้อนหลัง
              </h2>
              <p className="text-xs text-slate-400 font-normal m-0">
                บันทึกไว้ทั้งหมด {history.length} รายการ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {selectedSnapshot ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <button
                    onClick={() => setSelectedSnapshot(null)}
                    className="text-xs font-semibold text-emerald-600 hover:underline mb-1 inline-flex items-center"
                  >
                    ← กลับไปหน้ารายการ
                  </button>
                  <h3 className="text-sm font-bold text-slate-800 m-0">
                    รายงานสต็อกวันที่: {selectedSnapshot.date}
                  </h3>
                  <p className="text-xs text-slate-500 m-0">
                    ยอดขายรวม: <strong className="text-emerald-600">{selectedSnapshot.totalSold}</strong> หน่วย
                  </p>
                </div>
                <button
                  onClick={() => exportToExcel(selectedSnapshot.items, selectedSnapshot.date)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium flex items-center space-x-1 shadow-2xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>โหลด Excel</span>
                </button>
              </div>

              {/* Table of items in snapshot */}
              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2 w-10 text-center">#</th>
                      <th className="p-2">รายการ</th>
                      <th className="p-2 text-center">ยกมา (A)</th>
                      <th className="p-2 text-center">สั่ง (B)</th>
                      <th className="p-2 text-center">เปิด (C)</th>
                      <th className="p-2 text-center">ปิด (D)</th>
                      <th className="p-2 text-center font-bold text-emerald-700 bg-emerald-50">
                        ขาย (E)
                      </th>
                      <th className="p-2">หมายเหตุ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedSnapshot.items.map((it) => (
                      <tr key={it.id} className="hover:bg-slate-50">
                        <td className="p-2 text-center text-slate-400">{it.no}</td>
                        <td className="p-2 font-medium text-slate-800">{it.name}</td>
                        <td className="p-2 text-center">{it.broughtForward || 0}</td>
                        <td className="p-2 text-center">{it.added || 0}</td>
                        <td className="p-2 text-center font-semibold text-sky-800">{it.totalOpen}</td>
                        <td className="p-2 text-center font-semibold text-slate-700">{it.totalClose}</td>
                        <td className="p-2 text-center font-extrabold text-emerald-600 bg-emerald-50/50">
                          {it.sold}
                        </td>
                        <td className="p-2 text-slate-500 text-[11px]">{it.remark || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">ยังไม่มีประวัติการปิดยอดที่ผ่านมา</p>
              <p className="text-xs text-slate-400 mt-1">
                เมื่อกดปุ่ม "ปิดยอดประจำวัน" ข้อมูลจะถูกจัดเก็บไว้ที่นี่โดยอัตโนมัติ
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((snapshot) => (
                <div
                  key={snapshot.id}
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-emerald-50/30 rounded-xl border border-slate-200 transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                      {snapshot.date.split('-')[2] || '📅'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 m-0">
                        วันที่: {snapshot.date}
                      </p>
                      <p className="text-xs text-slate-500 m-0">
                        ยอดขายรวม:{' '}
                        <strong className="text-emerald-600 font-bold">
                          {snapshot.totalSold}
                        </strong>{' '}
                        หน่วย • {snapshot.items.length} รายการสินค้า
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedSnapshot(snapshot)}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium flex items-center space-x-1 transition shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>ดูรายละเอียด</span>
                    </button>
                    <button
                      onClick={() => exportToExcel(snapshot.items, snapshot.date)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                      title="ดาวน์โหลด Excel ของวันนี้"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          {history.length > 0 && !selectedSnapshot ? (
            <button
              onClick={() => {
                if (window.confirm('คุณต้องการลบประวัติการปิดยอดทั้งหมดหรือไม่?')) {
                  onClearHistory();
                }
              }}
              className="text-xs text-rose-500 hover:text-rose-700 hover:underline flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ล้างประวัติทั้งหมด</span>
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
