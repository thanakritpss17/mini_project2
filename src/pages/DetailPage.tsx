import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchComicById } from '../api/comicsApi';
import { useUserStore } from '../store/useUserStore';
import { ErrorState } from '../components/ErrorState';

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { data: comic, isLoading, isError, refetch } = useQuery({
    queryKey: ['comic', id],
    queryFn: () => fetchComicById(id || ''),
    enabled: !!id,
  });

  const { isInCollection, toggleCollection, unlockBook, isUnlocked } = useUserStore();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-20 text-center text-slate-500 font-medium">
        กำลังโหลดข้อมูลหนังสือ...
      </div>
    );
  }

  if (isError || !comic) {
    return <ErrorState onRetry={refetch} message={`ไม่พบข้อมูลหนังสือรหัส #${id}`} />;
  }

  const saved = isInCollection(comic.id);
  const unlocked = isUnlocked(comic.id);
  const coverUrl = comic.formats?.['image/jpeg'] || 'https://via.placeholder.com/300x400?text=No+Cover';
  const pointCost = comic.pointCost || 1000;

  const handleExchange = () => {
    const success = unlockBook(comic.id, pointCost, comic.title);
    if (success) {
      showToast('ปลดล็อกหนังสือเรียบร้อยแล้ว');
    } else {
      showToast('แต้มสะสมไม่เพียงพอ');
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl space-y-5">
      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-sm font-medium shadow-sm">
          {toastMessage}
        </div>
      )}

      {/* ปุ่มย้อนกลับหน้าหลักฉบับปรับปรุงสไตล์ให้คมชัดขึ้น */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 px-4 py-2 rounded-lg shadow-2xs hover:shadow-xs transition-all"
        >
          ย้อนกลับหน้าหลัก
        </Link>
      </div>

      {/* การ์ดรายละเอียดหนังสือ */}
      <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-center shrink-0 items-center">
          <img src={coverUrl} alt={comic.title} className="max-h-96 object-contain rounded-lg shadow-sm" />
        </div>

        <div className="w-full md:w-2/3 space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{comic.title}</h1>
            <p className="text-xs text-slate-400 mt-1">รหัสหนังสือ: #{comic.id}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
            <div><strong>ผู้แต่ง:</strong> {comic.authors?.map((a) => a.name).join(', ') || 'ไม่ระบุ'}</div>
            <div><strong>หมวดหมู่:</strong> {comic.subjects?.join(', ') || 'Manga'}</div>
            <div><strong>ภาษา:</strong> {comic.languages?.join(', ').toUpperCase() || 'TH, JP'}</div>
            <div><strong>ยอดดาวน์โหลด:</strong> {comic.download_count?.toLocaleString() || 0} ครั้ง</div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">เรื่องย่อ</h3>
            <p className="text-slate-600 leading-relaxed text-xs">{comic.synopsis || 'ไม่มีข้อมูลเรื่องย่อ'}</p>
          </div>

          <div className="p-5 border border-blue-200 bg-blue-50/50 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">ราคาปลดล็อก</span>
              <span className="text-2xl font-extrabold text-blue-900">{pointCost} แต้ม</span>
            </div>

            {unlocked ? (
              <span className="bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg">
                ปลดล็อกแล้ว
              </span>
            ) : (
              <button
                onClick={handleExchange}
                className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                ใช้แต้มปลดล็อก
              </button>
            )}
          </div>

          <button
            onClick={() => {
              toggleCollection(comic.id);
              showToast(saved ? 'ลบออกจากคอลเลกชันแล้ว' : 'บันทึกเข้าคอลเลกชันแล้ว');
            }}
            className={`w-full py-2.5 border rounded-xl text-xs font-medium transition-colors ${
              saved
                ? 'border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100'
                : 'border-slate-300 text-slate-700 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            {saved ? 'ลบออกจากคอลเลกชัน' : 'บันทึกเข้าคอลเลกชัน'}
          </button>
        </div>
      </div>
    </div>
  );
};