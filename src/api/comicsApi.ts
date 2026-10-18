import type { ComicBook } from '../types/comic';

const BASE_URL = 'https://kitsu.io/api/edge';

// Google Translate API
const translateToThai = async (text: string): Promise<string> => {
  if (!text || text.trim() === '') return 'ไม่มีข้อมูลเรื่องย่อ';

  try {
    const cleanText = text.substring(0, 500);
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=th&dt=t&q=${encodeURIComponent(cleanText)}`
    );

    if (response.ok) {
      const result = await response.json();
      const translatedText = result[0]?.map((item: any) => item[0]).join('');
      return translatedText || text;
    }
  } catch (error) {
    console.warn('Google Translate API error:', error);
  }

  return text;
};

// ราคาแต้ม
const calculatePointCost = (id: number): number => {
  const min = 899;
  const max = 2599;
  // ใช้สูตร Modulo จาก ID เพื่อให้การสุ่มสม่ำเสมอสำหรับหนังสือเล่มเดิม
  return min + ((id * 37) % (max - min + 1));
};

// ดึงและ Map ข้อมูลจาก Kitsu
const mapKitsuItemToComic = (item: any): ComicBook => {
  const title = item.attributes.canonicalTitle || item.attributes.titles.en_jp || 'ไม่ระบุชื่อ';
  const rawSynopsis = item.attributes.synopsis || '';
  const comicId = Number(item.id);

  return {
    id: comicId,
    title: title,
    authors: [{ name: item.attributes.authors || 'ไม่ระบุผู้แต่ง' }],
    languages: ['TH', 'JP'],
    download_count: item.attributes.userCount || 0,
    pointCost: calculatePointCost(comicId), // สุ่มราคาแต้มในช่วง 899 - 2,599
    formats: {
      'image/jpeg':
        item.attributes.posterImage?.small ||
        item.attributes.posterImage?.original ||
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=80',
    },
    subjects: [item.attributes.mangaType || 'Manga'],
    synopsis: rawSynopsis,
  };
};

export const fetchComics = async (): Promise<ComicBook[]> => {
  try {
    const [resPage1, resPage2] = await Promise.all([
      fetch(`${BASE_URL}/manga?page[limit]=20&page[offset]=0`),
      fetch(`${BASE_URL}/manga?page[limit]=20&page[offset]=20`),
    ]);

    if (!resPage1.ok) {
      throw new Error('ไม่สามารถโหลดข้อมูลหนังสือการ์ตูนได้');
    }

    const data1 = await resPage1.json();
    const data2 = resPage2.ok ? await resPage2.json() : { data: [] };

    const combinedData = [...data1.data, ...data2.data];

    return combinedData.slice(0, 32).map(mapKitsuItemToComic);
  } catch (err) {
    console.error('Fetch Comics Error:', err);
    throw new Error('ไม่สามารถโหลดข้อมูลหนังสือการ์ตูนได้');
  }
};

export const fetchComicById = async (id: string): Promise<ComicBook> => {
  try {
    const response = await fetch(`${BASE_URL}/manga/${id}`);
    if (response.ok) {
      const result = await response.json();
      const comic = mapKitsuItemToComic(result.data);
      comic.synopsis = await translateToThai(comic.synopsis || '');
      return comic;
    }
  } catch (err) {
    console.warn('Direct fetch failed, fallback to list search');
  }

  const allComics = await fetchComics();
  const found = allComics.find((b) => b.id === Number(id));
  if (found) {
    found.synopsis = await translateToThai(found.synopsis || '');
    return found;
  }

  throw new Error(`ไม่พบหนังสือการ์ตูนรหัส #${id}`);
};