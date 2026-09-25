import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';
import type { ItemCategory, StockItem } from '../types/stock';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<StockItem, 'id' | 'no'>) => void;
  existingCount: number;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  existingCount,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ItemCategory>('liquor');
  const [unit, setUnit] = useState('ขวด');
  const [broughtForward, setBroughtForward] = useState<number | ''>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      category,
      unit: unit.trim() || 'ขวด',
      broughtForward: broughtForward === '' ? '' : Number(broughtForward),
      added: '',
      openFront: '',
      openBack: '',
      closeFront: '',
      closeBack: '',
      remark: '',
    });

    setName('');
    setCategory('liquor');
    setUnit('ขวด');
    setBroughtForward('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PlusCircle className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-white m-0">
              เพิ่มรายการเครื่องดื่มใหม่
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              ชื่อเครื่องดื่ม <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น แบล็คเลเบิ้ล, ช้าง, โค้กซีโร่..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                หมวดหมู่
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ItemCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                <option value="liquor">🥃 สุรา / บรั่นดี</option>
                <option value="beer">🍺 เบียร์</option>
                <option value="mixer">🥤 มิกเซอร์ / น้ำ</option>
                <option value="other">📦 อื่นๆ</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                หน่วยนับ
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="ขวด, แบน, กลม, กระป๋อง"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              (A) ยอดยกมาเริ่มต้น (ถ้ามี)
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={broughtForward}
              onChange={(e) => {
                const val = e.target.value;
                setBroughtForward(val === '' ? '' : parseInt(val, 10) || 0);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              ลำดับถัดไปคือ ลำดับที่ {existingCount + 1}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm shadow-emerald-600/30 transition"
            >
              บันทึกสินค้า
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
