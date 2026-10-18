import React from 'react';

interface Developer {
  id: number;
  name: string;
  studentId: string;
  role: string;
  avatar: string;
  email: string;
}

export const AboutPage: React.FC = () => {
  const developers: Developer[] = [
    {
      id: 1,
      name: 'Thanakrit Prasertsorn',
      studentId: '1660705219',
      role: 'Developer & UI Design',
      avatar: 'src/img/tha.png',
      email: 'thanakrit.pras@bumail.net',
    },
    {
      id: 2,
      name: 'Vilaikeo Manyphet',
      studentId: '1630708244',
      role: 'UX/UI & Presentation',
      avatar: 'src/img/vi.png',
      email: 'vilaikeo.many@bumail.net',
    },
    {
      id: 3,
      name: 'Jiranuwat Kamkrathok',
      studentId: '1660705029',
      role: 'Tester & API',
      avatar: 'src/img/ji.png',
      email: 'jiranuwat.kamk@bumail.net',
    },
  ];

  return (
    <div className="container mx-auto px-6 py-10 max-w-6xl space-y-8">
      {/* ส่วนหัวของหน้า */}
      <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-wide">
          ผู้พัฒนา
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          เว็บแอปพลิเคชัน ReadSpace Pro สำหรับการค้นหา อ่านเรื่องย่อ และปลดล็อกการ์ตูนมังงะ
        </p>
      </div>

      {/* ผู้พัฒนา */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {developers.map((dev) => (
          <div
            key={dev.id}
            className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm flex flex-col items-center text-center space-y-4 hover:border-slate-300 transition-all"
          >
            {/* รูปโปรไฟล์*/}
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-100 bg-slate-50 shadow-inner p-1">
              <img
                src={dev.avatar}
                alt={dev.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* สมาชิก */}
            <div className="space-y-1 w-full">
              <h3 className="font-bold text-slate-900 text-lg">{dev.name}</h3>
              <p className="text-xs font-semibold text-blue-900">
                รหัสนักศึกษา: {dev.studentId}
              </p>
              <p className="text-xs text-slate-400">{dev.email}</p>
            </div>

            {/* บทบาทหน้าที่ */}
            <div className="w-full pt-2 border-t border-slate-100">
              <span className="inline-block bg-blue-50 border border-blue-200 text-blue-900 text-xs px-3 py-1.5 rounded-md font-medium w-full">
                {dev.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/*  API  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* กล่องรายละเอียด*/}
        <div className="md:col-span-2 bg-white p-6 border border-slate-200 rounded-xl shadow-sm space-y-3">
          <h2 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
            แหล่งข้อมูลและ API ที่เชื่อมต่อ 
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            ระบบใช้งานข้อมูลการ์ตูนมังงะสาธารณะผ่าน <strong>Kitsu API</strong> โดยดึงข้อมูลแบบสตรีมมิ่งเพื่อประมวลผลรายชื่อการ์ตูนแบบ Real-time ร่วมกับ <strong>Google Translate API</strong> ในการแปลเนื้อหาเรื่องย่อภาษาอังกฤษเป็นภาษาไทยโดยอัตโนมัติ
          </p>
          <div className="pt-2">
            <a
              href="https://kitsu.docs.apiary.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-lg transition-colors"
            >
              เอกสารอ้างอิง  API  &rarr;
            </a>
          </div>
        </div>

        {/* เทคโนโลยีที่ใช้ */}
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm space-y-3">
          <h2 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
            สถาปัตยกรรมระบบ (Tech Stack)
          </h2>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex justify-between border-b border-slate-50 pb-1">
              <span>Core Framework:</span>
              <strong className="text-slate-800">React + Vite</strong>
            </li>
            <li className="flex justify-between border-b border-slate-50 pb-1">
              <span>Language:</span>
              <strong className="text-slate-800">TypeScript</strong>
            </li>
            <li className="flex justify-between border-b border-slate-50 pb-1">
              <span>State Management:</span>
              <strong className="text-slate-800">Zustand</strong>
            </li>
            <li className="flex justify-between border-b border-slate-50 pb-1">
              <span>Data Fetching:</span>
              <strong className="text-slate-800">TanStack Query</strong>
            </li>
            <li className="flex justify-between">
              <span>Styling:</span>
              <strong className="text-slate-800">Tailwind CSS</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};