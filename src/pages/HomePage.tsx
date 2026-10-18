import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchComics } from '../api/comicsApi';
import { ComicCard } from '../components/ComicCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { ErrorState } from '../components/ErrorState';

export const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');

  const { data: comics, isLoading, isError, refetch } = useQuery({
    queryKey: ['comics'],
    queryFn: fetchComics,
  });

  const filteredComics = comics?.filter((comic) =>
    comic.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-8 space-y-8 max-w-6xl">
      {/* กล่องข้อความสีขาว ตัวหนังสือสีดำเห็นชัด */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col items-center text-center space-y-5">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-wide">
            ห้องสมุดมังงะ & นิยายยอดฮิต
          </h1>
          <p className="text-sm md:text-base text-slate-600 font-medium mt-2">
            เพลิดเพลินกับการอ่านเรื่องโปรด สะสมแต้มสนุกๆ ทุกวันเพื่อสิทธิพิเศษ
          </p>
        </div>

        {/* ช่องค้นหา */}
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="ค้นหาชื่อหนังสือ/การ์ตูนที่สนใจ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 font-medium placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* กำลังโหลด */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* เกิดข้อผิดพลาด */}
      {isError && (
        <ErrorState
          onRetry={refetch}
          message="ไม่สามารถโหลดรายการหนังสือการ์ตูนได้"
        />
      )}

      {/* รายการการ์ตูน */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredComics?.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      )}
    </div>
  );
};