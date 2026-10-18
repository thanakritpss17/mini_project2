import React from 'react';
import { Link } from 'react-router-dom';
import type { ComicBook } from '../types/comic';
import { useUserStore } from '../store/useUserStore';

interface ComicCardProps {
  comic: ComicBook;
  hidePoints?: boolean;
}

export const ComicCard: React.FC<ComicCardProps> = ({ comic, hidePoints = false }) => {
  const { isInCollection, toggleCollection } = useUserStore();
  const saved = isInCollection(comic.id);

  const coverUrl = comic.formats['image/jpeg'] || 'https://via.placeholder.com/300x400?text=No+Cover';

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group h-full">
      <div>
        {/* รูปปกการ์ตูน */}
        <div className="w-full aspect-[3/4] bg-slate-100 overflow-hidden relative border-b border-slate-100">
          <img
            src={coverUrl}
            alt={comic.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* ข้อมูลการ์ตูน */}
        <div className="p-3.5 pb-2">
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1 group-hover:text-blue-800 transition-colors" title={comic.title}>
            {comic.title}
          </h3>
          <p className="text-[12px] text-slate-500 mt-1 line-clamp-1">
            ผู้แต่ง: {comic.authors.map((a) => a.name).join(', ') || 'ไม่ระบุ'}
          </p>
        </div>
      </div>

      {/* ราคาแต้ม + ปุ่มกด */}
      <div className="p-3.5 pt-1 space-y-2.5">
        {!hidePoints && (
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">ราคาปลดล็อก</span>
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              {comic.pointCost} แต้ม
            </span>
          </div>
        )}

        {/* ปุ่มกดบันทึก */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => toggleCollection(comic.id)}
            className={`text-xs py-1.5 rounded-lg font-medium transition-colors text-center ${
              saved
                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {saved ? 'บันทึกแล้ว' : 'บันทึก'}
          </button>
          <Link
            to={`/comic/${comic.id}`}
            className="text-xs py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-medium transition-colors text-center block"
          >
            รายละเอียด
          </Link>
        </div>
      </div>
    </div>
  );
};