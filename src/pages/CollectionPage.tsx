import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchComics } from '../api/comicsApi';
import { useUserStore } from '../store/useUserStore';
import { ComicCard } from '../components/ComicCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { ErrorState } from '../components/ErrorState';

export const CollectionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'saved'>('all');
  const { collection, unlockedBooks } = useUserStore();

  const { data: comics, isLoading, isError, refetch } = useQuery({
    queryKey: ['comics'],
    queryFn: fetchComics,
  });

  const savedComics = comics?.filter((comic) => collection.includes(comic.id)) || [];
  const unlockedComics = comics?.filter((comic) => unlockedBooks.includes(comic.id)) || [];

  const allUserComics = comics?.filter(
    (comic) => collection.includes(comic.id) || unlockedBooks.includes(comic.id)
  ) || [];

  const displayComics =
    activeTab === 'unlocked'
      ? unlockedComics
      : activeTab === 'saved'
      ? savedComics
      : allUserComics;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="bg-white p-5 border border-gray-300 rounded shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">คอลเลกชันส่วนตัว</h1>
          <p className="text-sm text-gray-600 mt-1">รายการหนังสือที่คุณบันทึกไว้และหนังสือที่ใช้แต้มปลดล็อกแล้ว</p>
        </div>

        <div className="inline-flex border border-gray-300 rounded p-1 bg-gray-50 space-x-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 text-xs font-medium rounded ${
              activeTab === 'all' ? 'bg-blue-800 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            ทั้งหมด ({allUserComics.length})
          </button>
          <button
            onClick={() => setActiveTab('unlocked')}
            className={`px-3 py-1 text-xs font-medium rounded ${
              activeTab === 'unlocked' ? 'bg-blue-800 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            ปลดล็อกแล้ว ({unlockedComics.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3 py-1 text-xs font-medium rounded ${
              activeTab === 'saved' ? 'bg-blue-800 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            บันทึกไว้ ({savedComics.length})
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {isError && <ErrorState onRetry={refetch} message="ไม่สามารถดึงข้อมูลคอลเลกชันได้" />}

      {!isLoading && !isError && displayComics.length === 0 && (
        <div className="bg-white p-12 text-center border border-gray-300 rounded text-gray-600">
          <p className="font-bold text-lg">ไม่พบรายการหนังสือในหมวดนี้</p>
          <p className="text-sm mt-1">คุณสามารถเลือกบันทึกหนังสือหรือใช้แต้มแลกอ่านได้จากหน้าหลัก</p>
        </div>
      )}

      {!isLoading && !isError && displayComics.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayComics.map((comic) => (
            <ComicCard key={comic.id} comic={comic} hidePoints={true} />
          ))}
        </div>
      )}
    </div>
  );
};