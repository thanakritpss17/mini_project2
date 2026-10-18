import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transaction {
  id: string;
  type: 'topup' | 'purchase'; // 'topup' เติมแต้ม 'purchase' ปลดล็อกหนังสือ
  title: string; // เติมแต้ม ปลดล็อก Monster
  amount: number; 
  date: string; // วันเวลาที่ทำรายการ
}

interface UserState {
  points: number;
  collection: number[];
  unlockedBooks: number[];
  transactions: Transaction[]; // ประวัติการทำรายการ
  addPoints: (amount: number, description?: string) => void;
  deductPoints: (amount: number) => boolean;
  isInCollection: (comicId: number) => boolean;
  toggleCollection: (comicId: number) => void;
  isUnlocked: (comicId: number) => boolean;
  unlockBook: (comicId: number, cost: number, bookTitle?: string) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      points: 1000,
      collection: [],
      unlockedBooks: [],
      transactions: [],

      addPoints: (amount, description = 'เติมแต้มสะสม') => {
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          type: 'topup',
          title: description,
          amount: amount,
          date: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }),
        };

        set((state) => ({
          points: state.points + amount,
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      deductPoints: (amount) => {
        if (get().points >= amount) {
          set((state) => ({ points: state.points - amount }));
          return true;
        }
        return false;
      },

      isInCollection: (comicId) => get().collection.includes(comicId),

      toggleCollection: (comicId) =>
        set((state) => ({
          collection: state.collection.includes(comicId)
            ? state.collection.filter((id) => id !== comicId)
            : [...state.collection, comicId],
        })),

      isUnlocked: (comicId) => get().unlockedBooks.includes(comicId),

      unlockBook: (comicId, cost, bookTitle = 'หนังสือการ์ตูน') => {
        const { points, unlockedBooks, transactions } = get();
        if (unlockedBooks.includes(comicId)) return true;

        if (points >= cost) {
          const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: 'purchase',
            title: `ปลดล็อกอ่านเรื่อง: ${bookTitle}`,
            amount: -cost,
            date: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }),
          };

          set({
            points: points - cost,
            unlockedBooks: [...unlockedBooks, comicId],
            transactions: [newTransaction, ...transactions],
          });
          return true;
        }
        return false;
      },
    }),
    {
      name: 'manga-user-storage',
    }
  )
);