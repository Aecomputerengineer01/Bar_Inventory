import type { StockItem, DailySnapshot } from '../types/stock';
import { INITIAL_ITEMS } from './initialData';

const STORAGE_KEY_ITEMS = 'jabb_bar_stock_items_v1';
const STORAGE_KEY_HISTORY = 'jabb_bar_stock_history_v1';
const STORAGE_KEY_DATE = 'jabb_bar_stock_date_v1';

export function loadStockItems(): StockItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ITEMS);
    if (!raw) return INITIAL_ITEMS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_ITEMS;
  } catch (e) {
    console.error('Failed to load stock items from localStorage:', e);
    return INITIAL_ITEMS;
  }
}

export function saveStockItems(items: StockItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save stock items to localStorage:', e);
  }
}

export function loadStockDate(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DATE);
    if (raw) return raw;
  } catch (e) {
    console.error(e);
  }
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function saveStockDate(dateStr: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_DATE, dateStr);
  } catch (e) {
    console.error(e);
  }
}

export function loadHistory(): DailySnapshot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load history:', e);
    return [];
  }
}

export function saveHistory(history: DailySnapshot[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}
